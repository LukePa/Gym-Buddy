import {PostLoginRequestMapper, PostLoginResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/routes/account/PostLogin"
import {PostLoginResponse} from "@gym-buddy/requestresponsetypes/models/responses/account";
import {ErrorResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/errorResponse"
import {getApiUrl} from "../../helpers/envHelpers.js";

export default async function(username: string, password: string): Promise<PostLoginResponse> {
    const request = PostLoginRequestMapper.create(username, password);
    const res = await fetch(`${getApiUrl()}/account/login`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    })
    
    const body = await res.json();
    
    if (res.ok) {
        return PostLoginResponseMapper.fromAny(body);
    } else {
        const errorResponse = ErrorResponseMapper.fromAny(body);
        throw new Error(errorResponse.error);
    }
}