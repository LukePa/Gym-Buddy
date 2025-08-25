import {PostLoginRequestMapper, PostLoginResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/routes/account/PostLogin"
import {PostLoginResponse} from "@gym-buddy/requestresponsetypes/models/responses/account";
import {ErrorResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/errorResponse"

export default async function(username: string, password: string): Promise<PostLoginResponse> {
    const request = PostLoginRequestMapper.create(username, password);
    const res = await fetch("account/login", {
        method: "post"
    })
    
    const body = await res.json();
    
    if (res.status < 200 || res.status > 299) {
        const errorResponse = ErrorResponseMapper.fromAny(body);
        throw new Error(errorResponse.error);
    } else {
        return PostLoginResponseMapper.fromAny(body);
    }
}