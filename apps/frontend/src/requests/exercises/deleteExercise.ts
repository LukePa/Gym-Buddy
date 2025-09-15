import {
    DeleteExerciseResponse,
} from "@gym-buddy/requestresponsetypes/models/responses/exercises";
import performAuthenticatedRequest from "../performAuthenticatedRequest.js";
import {getApiUrl} from "../../helpers/envHelpers.js";
import {ErrorResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/errorResponse";
import {DeleteExerciseResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/routes/exercises/DeleteExercise";


export default async function deleteExercise(id: string): Promise<DeleteExerciseResponse> {
    const response = await performAuthenticatedRequest(`${getApiUrl()}/exercises/${id}`, {
        method: "delete",
    });

    const body = await response.json();
    if (response.ok) {
        return DeleteExerciseResponseMapper.fromAny(body);
    } else {
        const error = ErrorResponseMapper.fromAny(body);
        throw new Error(error.error);
    }
}
