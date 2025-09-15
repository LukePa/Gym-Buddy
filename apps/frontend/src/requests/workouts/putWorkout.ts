import performAuthenticatedRequest from "../performAuthenticatedRequest.js";
import {getApiUrl} from "../../helpers/envHelpers.js";
import {ErrorResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/errorResponse";
import {PutWorkoutRequest} from "@gym-buddy/requestresponsetypes/models/requests/workouts";
import {PutWorkoutResponse} from "@gym-buddy/requestresponsetypes/models/responses/workouts";
import {PutWorkoutResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/routes/workouts/PutWorkout";


export default async function putWorkout(id: string, request: PutWorkoutRequest): Promise<PutWorkoutResponse> {
    const response = await performAuthenticatedRequest(`${getApiUrl()}/workouts/${id}`, {
        method: "put",
        body: JSON.stringify(request)
    });

    const body = await response.json();
    if (response.ok) {
        return PutWorkoutResponseMapper.fromAny(body);
    } else {
        const error = ErrorResponseMapper.fromAny(body);
        throw new Error(error.error);
    }
}
