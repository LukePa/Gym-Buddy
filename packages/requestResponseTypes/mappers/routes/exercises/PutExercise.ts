import {PutExerciseRequest} from "../../../models/requests/exercises";
import {PutExerciseResponse} from "../../../models/responses/exercises";
import {ExerciseWithoutId} from "../../../models/entities/exercise";
import ExerciseWithoutIdMapper from "../../entities/ExerciseWithoutIdMapper";


export class PutExerciseRequestMapper {
    static create(exercise: ExerciseWithoutId): PutExerciseRequest {
        return exercise;
    }

    static fromAny(input: any): PutExerciseRequest {
        return ExerciseWithoutIdMapper.fromAny(input);
    }
}

export class PutExerciseResponseMapper {
    static create(): PutExerciseResponse {
        return {};
    }

    static fromAny(input: any): PutExerciseResponse {
        return {};
    }
}