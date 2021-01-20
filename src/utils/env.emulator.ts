export const setEndpointEnv = (env: "loc" | "staging" | "production") => {
    localStorage.setItem("env", env);
}
export const getCurrentEnv = () => {
    return localStorage.getItem("env");
}

export const getCurrentEnvNumber = () => {
    switch (localStorage.getItem("env")) {
        case "loc":
            return 0;
        case "staging":
            return 1;
        case "production":
            return 2;
        default:
            return 1;
    }
}