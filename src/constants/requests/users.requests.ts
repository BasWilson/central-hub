import IRequest from "../../interfaces/i.request";

export default {
    profile: <IRequest>{
        method: "GET",
        path: "/users/profile",
    },
    setPoints: <IRequest>{
        method: "GET",
        path: "/users/set-points",
    }
}