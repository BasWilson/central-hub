import createRequest from "../utils/create.request";
import jwtRequests from "../utils/jwt.requests";
import { UserStore } from '../stores/user.store';
import authRequests from "../constants/requests/auth.requests";
import usersRequests from "../constants/requests/users.requests";

/**
 * Handle logging in, registering and initial authentication to confirm the user is (still) signed in
 */
class AccountService {

    /**
     * Verifies the user's session.
     */
    authenticate = async (userStore?: UserStore): Promise<boolean> => {
        const req = createRequest(usersRequests.profile);
        const res = await jwtRequests.que(req);
        if (!res || res.error) {
            return false;
        }
        if (userStore) {
            userStore.setUser(res);
        }
        return true;
    }

    /**
     * Tries to log the user in with credentials passed to it
     * @param email
     * @param password
     */
    login = async (email: string, password: string, userStore?: UserStore) => {
        const res = await jwtRequests.login(email, password);
        if (!res) {
            return false;
        }
        return await this.authenticate(userStore);
    }

    /**
     * Tries to create a new account with credentials passed to it
     * @param email 
     * @param password 
     */
    register = async (email: string, password: string, userStore?: UserStore) => {
        const req = createRequest(authRequests.register, { email, password });
        const res = await jwtRequests.que(req);
        if (!res || res.error) {
            return res;
        }
        return await this.login(email, password, userStore);
    }

    // Clear tokens and load root
    signout = () => {
        localStorage.clear();
        window.location.replace("/");
    }
}

export default new AccountService();