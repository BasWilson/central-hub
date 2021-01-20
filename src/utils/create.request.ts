import IRequest from "../interfaces/i.request";

export default function (request: IRequest, data?: any, contentType?: string) {
    const req = Object.assign({}, request);
    if (data)
        req.data = data;

    if (contentType)
        req.contentType = contentType

    return req;
}
