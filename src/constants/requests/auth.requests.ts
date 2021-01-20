import IRequest from "../../interfaces/i.request";

export default {
    login: <IRequest>{
        method: "POST",
        path: "/auth/login",
        dontRetry: true
    },
    register: <IRequest>{
        method: "POST",
        path: "/auth/register"
    },
    refresh: <IRequest>{
        method: "POST",
        path: "/auth/refresh",
    },
    steamLink: <IRequest>{
        method: "GET",
        path: "/auth/steam",
    }
}