import performAuthenticatedRequest from "../performAuthenticatedRequest.js";
import {getApiUrl} from "../../helpers/envHelpers.js";
import {ErrorResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/errorResponse";
import {DeleteWorkoutResponse} from "@gym-buddy/requestresponsetypes/models/responses/workouts";
import {DeleteWorkoutResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/routes/workouts/DeleteWorkout";


export default async function deleteWorkout(id: string): Promise<DeleteWorkoutResponse> {
    const response = await performAuthenticatedRequest(`${getApiUrl()}/workouts/${id}`, {
        method: "delete",
    });

    const body = await response.json();
    if (response.ok) {
        return DeleteWorkoutResponseMapper.fromAny(body);
    } else {
        const error = ErrorResponseMapper.fromAny(body);
        throw new Error(error.error);
    }
}
