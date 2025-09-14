import {
    PutExerciseResponse
} from "@gym-buddy/requestresponsetypes/models/responses/exercises";
import {PutExerciseRequest} from "@gym-buddy/requestresponsetypes/models/requests/exercises";
import performAuthenticatedRequest from "../performAuthenticatedRequest.js";
import {getApiUrl} from "../../helpers/envHelpers.js";
import {ErrorResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/errorResponse";
import {PutExerciseResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/routes/exercises/PutExercise";


export default async function putExercise(id: string, request: PutExerciseRequest): Promise<PutExerciseResponse> {
    const response = await performAuthenticatedRequest(`${getApiUrl()}/exercises/${id}`, {
        method: "put",
        body: JSON.stringify(request)
    });

    const body = await response.json();
    if (response.ok) {
        return PutExerciseResponseMapper.fromAny(body);
    } else {
        const error = ErrorResponseMapper.fromAny(body);
        throw new Error(error.error);
    }
}
