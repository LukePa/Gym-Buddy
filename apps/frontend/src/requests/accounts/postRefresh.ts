import {PostRefreshResponse} from "@gym-buddy/requestresponsetypes/models/responses/account";
import performAuthenticatedRequest from "../performAuthenticatedRequest.js";
import {getApiUrl} from "../../helpers/envHelpers.js";
import {PostRefreshResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/routes/account/PostRefresh";
import {ErrorResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/errorResponse";


export default async function PostRefresh(): Promise<PostRefreshResponse> {
    const response = await performAuthenticatedRequest(`${getApiUrl()}/account/refresh`, {
        method: "post"
    });
    
    const body = await response.json();
    if (response.ok) {
        return PostRefreshResponseMapper.fromAny(body);
    } else {
        const error = ErrorResponseMapper.fromAny(body);
        throw new Error(error.error);
    }
}