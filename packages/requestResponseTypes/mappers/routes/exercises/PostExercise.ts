import {PostExerciseRequest} from "../../../models/requests/exercises";
import {PostExerciseResponse} from "../../../models/responses/exercises";
import {ExerciseWithoutId} from "../../../models/entities/exercise";
import ExerciseWithoutIdMapper from "../../entities/ExerciseWithoutIdMapper";


export class PostExerciseRequestMapper {
    static create(exercise: ExerciseWithoutId, workoutId?: string): PostExerciseRequest {
        return {
            ...exercise,
            workoutId
        };
    }
    
    static fromAny(input: any): PostExerciseRequest {
        const exercise = ExerciseWithoutIdMapper.fromAny(input);
        return {
            ...exercise,
            workoutId: input.workoutId
        };
    }
}

export class PostExerciseResponseMapper {
    static create(): PostExerciseResponse {
        return {};
    }
    
    static fromAny(input: any): PostExerciseResponse {
        return {};
    }
}