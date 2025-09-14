import {PostExerciseRequest} from "../../../models/requests/exercises";
import {PostExerciseResponse} from "../../../models/responses/exercises";
import {ExerciseWithId, ExerciseWithoutId} from "../../../models/entities/exercise";
import ExerciseWithoutIdMapper from "../../entities/ExerciseWithoutIdMapper";
import ExerciseWithIdMapper from "../../entities/ExerciseWithIdMapper.ts";


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
    static create(exercise: ExerciseWithId): PostExerciseResponse {
        return ExerciseWithIdMapper.create(exercise.id, exercise.name, exercise.metrics);
    }
    
    static fromAny(input: any): PostExerciseResponse {
        return ExerciseWithIdMapper.fromAny(input);
    }
}