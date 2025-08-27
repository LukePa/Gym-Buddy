import getUser from "../singleton/user.js";


export default async function performAuthenticatedRequest(
    input: string | URL | globalThis.Request,
    inputInit?: RequestInit,
): Promise<Response> {
    const user = getUser();
    const token = user.getAuthToken();
    if (!token) throw new Error("Can not send authenticated request without auth token");
    
    const init: RequestInit = inputInit ?? {};
    if (!init.headers) init.headers = {};
    init.headers = {
        ...init.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
    return fetch(input, init);
}