import Axios, { AxiosInstance, AxiosResponse } from "axios";
import { EventEmitter } from "events";
import authRequests from "../constants/requests/auth.requests";
import IRequest from "../interfaces/i.request";
import accountService from "../services/account.service";
import { apiEndPoint } from "./env.helpers";


class JwtRequests {

    private baseUrl: string;
    private dev: boolean;
    private emitter: EventEmitter;
    private locked: boolean;
    private access_token: string = "";
    private refresh_token: string = "";
    private axios: AxiosInstance;
    private errorCount: number;

    constructor() {

        this.locked = false;
        this.emitter = new EventEmitter();
        this.errorCount = 0;

        this.readStorage();

        // Determine if its dev
        this.dev = window.location.hostname === "localhost" || window.location.hostname === "";

        // Determine base url
        this.baseUrl = apiEndPoint();

        this.axios = Axios.create({
            withCredentials: true,
            baseURL: this.baseUrl,
            headers: {
                "Authorization": `Bearer ${this.access_token}`
            },
            validateStatus: (status) => status < 499
        });

        this.locked = false;
    }

    public reInit = () => {
        // Determine base url
        this.baseUrl = apiEndPoint();

        this.axios = Axios.create({
            withCredentials: true,
            baseURL: this.baseUrl,
            headers: {
                "Authorization": `Bearer ${this.access_token}`
            },
            validateStatus: (status) => status < 499
        });
    }

    public que = async (request: IRequest): Promise<any> => {

        // Wait until unlocked!
        if (this.locked) await new Promise(resolve => this.emitter.once('unlocked', resolve));

        // Lock the que
        this.locked = true;

        // Execute request
        const result = await this.executeRequest(request);

        // Unlock the que
        this.locked = false;

        // Emit unlocked event
        this.emitter.emit('unlocked');

        // Return the result
        return result;
    }

    /**
     * Returns false if request needs to be rerun
     * @param request 
     */
    private executeRequest = async (request: IRequest): Promise<any> => {
        try {
            if (this.errorCount > 1) {
                this.errorCount = 0;
                return;
            }

            let response: AxiosResponse;

            // Set auth header
            this.axios = Axios.create({
                withCredentials: true,
                baseURL: this.baseUrl,
                responseType: request.responseType || "json",
                headers: {
                    "Authorization": `Bearer ${this.access_token}`,
                    "Content-Type": request.contentType ? request.contentType : "application/json",
                },
                validateStatus: (status) => status < 499
            });

            switch (request.method) {
                case "GET":
                    response = await this.axios.get(request.path);
                    break;
                case "POST":
                    response = await this.axios.post(request.path, request.data);
                    break;
                case "DELETE":
                    response = await this.axios.delete(request.path);
                    break;
                case "PUT":
                    response = await this.axios.put(request.path, request.data);
                    break;
            }

            // If response fails because access_token is expired, refresh first and re-execute this request.
            if (response.status === 401) {
                this.errorCount++;

                // unauthorized, refresh our access token
                const refreshed = await this.refresh();

                // Access token has been refreshed, call ourselves again
                if (refreshed) {
                    return await this.executeRequest(request);
                } else {
                    return {
                        error: "Unauthorized",
                        message: ["Unauthorized"]
                    }
                }
            }

            // Check if successfull
            if (response.status >= 200 && response.status <= 400) {
                const { data } = response;
                this.errorCount = 0;
                // Transform the message array to single string if its an array of errors
                if (data.error) {
                    if (Array.isArray(data.message)) {
                        data.message = data.message[0];
                        response.data = data;
                    }
                }

                if (this.dev) {
                    console.log("REQUEST_EXECUTED:", response);
                }

                return response.data;
            }

            throw new Error("Reached unhandled code " + response.status);

        } catch (error) {
            console.error(error);
            this.errorCount++;
            return {
                error: "unknownError",
                message: ["unknownError"]
            }
        }
    }

    /**
     * Refresh the JWT token
     */
    public refresh = async (): Promise<boolean> => {
        if (!this.refresh_token) {
            return false;
        }

        const response = await this.axios.post(
            authRequests.refresh.path,
            {
                'refresh_token': this.refresh_token
            }
        );

        if (response.status === 401) {
            // Our refresh token is invalid, clear que etc.
            accountService.signout();
            return false;
        } else if (response.status >= 200 && response.status < 300) {
            // Assign new refresh_token and access_token
            this.access_token = response.data.access_token;
            this.refresh_token = response.data.refresh_token;

            // Update local storage
            localStorage.setItem("refresh_token", this.refresh_token);
            localStorage.setItem("access_token", this.access_token);

            // Reconnect all sockets
            // Implement if needed

            return true;
        }
        accountService.signout();
        return false;
    }

    public login = async (email: string, password: string) => {

        try {
            const response = await this.axios.post(
                authRequests.login.path,
                {
                    'email': email,
                    'password': password
                }
            );

            if (response.status === 401) {
                return false;

            } else if (response.status >= 200 && response.status < 300) {
                // Assign new refresh_token and access_token
                this.access_token = response.data.access_token;
                this.refresh_token = response.data.refresh_token;

                // Update local storage
                localStorage.setItem("refresh_token", this.refresh_token);
                localStorage.setItem("access_token", this.access_token);

                return true;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Retrieves a possible refresh token from the local storage
     */
    private readStorage = () => {
        const refresh_token = localStorage.getItem("refresh_token");
        const access_token = localStorage.getItem("access_token");

        if (refresh_token) {
            this.refresh_token = refresh_token;
        }

        if (access_token) {
            this.access_token = access_token;
        }
    }
}

export default new JwtRequests();
