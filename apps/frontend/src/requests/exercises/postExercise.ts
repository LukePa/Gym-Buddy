import {GetExercisesResponse, PostExerciseResponse} from "@gym-buddy/requestresponsetypes/models/responses/exercises";
import {PostExerciseRequest} from "@gym-buddy/requestresponsetypes/models/requests/exercises";
import performAuthenticatedRequest from "../performAuthenticatedRequest.js";
import {getApiUrl} from "../../helpers/envHelpers.js";
import {GetExercisesResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/routes/exercises/GetExercises";
import {ErrorResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/errorResponse";
import {
    PostExerciseRequestMapper,
    PostExerciseResponseMapper
} from "@gym-buddy/requestresponsetypes/mappers/routes/exercises/PostExercise";


export default async function postExercise(request: PostExerciseRequest): Promise<PostExerciseResponse> {
    const response = await performAuthenticatedRequest(`${getApiUrl()}/exercises`, {
        method: "post",
        body: JSON.stringify(request)
    });

    const body = await response.json();
    if (response.ok) {
        return PostExerciseResponseMapper.fromAny(body);
    } else {
        const error = ErrorResponseMapper.fromAny(body);
        throw new Error(error.error);
    }
}
