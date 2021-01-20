export const getQueryParamValue = (param: string) => {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        if (pair[0] == param) { return pair[1]; }
    }
}

export const getSlug = () => {
    return window.location.pathname.split("/").reverse()[0];
}