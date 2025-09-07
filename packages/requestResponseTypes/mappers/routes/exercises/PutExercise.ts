import {PutExerciseRequest} from "../../../models/requests/exercises";
import {PutExerciseResponse} from "../../../models/responses/exercises";
import {ExerciseWithoutId} from "../../../models/entities/exercise";
import ExerciseWithoutIdMapper from "../../entities/ExerciseWithoutIdMapper";


export class PutExerciseRequestMapper {
    static create(exercise: ExerciseWithoutId, workoutId?: string): PutExerciseRequest {
        return {
            ...exercise,
            workoutId
        };
    }

    static fromAny(input: any): PutExerciseRequest {
        const exercise = ExerciseWithoutIdMapper.fromAny(input);
        return {
            ...exercise,
            workoutId: input.workoutId
        };
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