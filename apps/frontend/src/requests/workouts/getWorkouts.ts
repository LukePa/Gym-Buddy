import performAuthenticatedRequest from "../performAuthenticatedRequest.js";
import {getApiUrl} from "../../helpers/envHelpers.js";
import {ErrorResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/errorResponse";
import {GetWorkoutsResponse} from "@gym-buddy/requestresponsetypes/models/responses/workouts";
import {GetWorkoutsResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/routes/workouts/GetWorkouts";


export default async function getWorkouts(): Promise<GetWorkoutsResponse> {
    const response = await performAuthenticatedRequest(`${getApiUrl()}/workouts`, {
        method: "get"
    });

    const body = await response.json();
    if (response.ok) {
        return GetWorkoutsResponseMapper.fromAny(body);
    } else {
        const error = ErrorResponseMapper.fromAny(body);
        throw new Error(error.error);
    }
}
