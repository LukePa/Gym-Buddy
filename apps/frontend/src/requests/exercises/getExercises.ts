import {GetExercisesResponse} from "@gym-buddy/requestresponsetypes/models/responses/exercises";
import performAuthenticatedRequest from "../performAuthenticatedRequest.js";
import {getApiUrl} from "../../helpers/envHelpers.js";
import {GetExercisesResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/routes/exercises/GetExercises";
import {ErrorResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/errorResponse";


export default async function getExercises(): Promise<GetExercisesResponse> {
    const response = await performAuthenticatedRequest(`${getApiUrl()}/exercises`, {
        method: "get"
    });
    
    const body = await response.json();
    if (response.ok) {
        return GetExercisesResponseMapper.fromAny(body);
    } else {
        const error = ErrorResponseMapper.fromAny(body);
        throw new Error(error.error);
    }
}
