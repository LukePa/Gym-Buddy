import performAuthenticatedRequest from "../performAuthenticatedRequest.js";
import {getApiUrl} from "../../helpers/envHelpers.js";
import {ErrorResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/errorResponse";
import {PostWorkoutRequest} from "@gym-buddy/requestresponsetypes/models/requests/workouts";
import {PostWorkoutResponse} from "@gym-buddy/requestresponsetypes/models/responses/workouts";
import {PostWorkoutResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/routes/workouts/PostWorkout";


export default async function postWorkout(request: PostWorkoutRequest): Promise<PostWorkoutResponse> {
    const response = await performAuthenticatedRequest(`${getApiUrl()}/workouts`, {
        method: "post",
        body: JSON.stringify(request)
    });

    const body = await response.json();
    if (response.ok) {
        return PostWorkoutResponseMapper.fromAny(body);
    } else {
        const error = ErrorResponseMapper.fromAny(body);
        throw new Error(error.error);
    }
}
