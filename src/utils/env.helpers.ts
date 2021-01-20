import { getCurrentEnv } from "./env.emulator";

export const apiEndPoint = () => {
    switch (getCurrentEnv()) {
        case "local":
            return "http://localhost:3000";
        case "staging":
            return "https://api-dev.hvh.gg";
        case "production":
            return "https://api.hvh.gg";
        default:
            return "http://localhost:3000";
    }
}
