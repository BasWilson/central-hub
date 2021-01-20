export const apiEndPoint = () => {
    switch (window.location.origin) {
        case "http://localhost:3001":
            return "http://localhost:3000";
        case "https://willywonka.dev":
            return "https://api-dev.hvh.gg";
        default:
            return "http://localhost:3000";
    }
}
