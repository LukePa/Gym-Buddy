import {PostExerciseRequest} from "../../../models/requests/exercises";
import {PostExerciseResponse} from "../../../models/responses/exercises";
import {ExerciseWithoutId} from "../../../models/entities/exercise";
import ExerciseWithoutIdMapper from "../../entities/ExerciseWithoutIdMapper";


export class PostExerciseRequestMapper {
    static create(exercise: ExerciseWithoutId): PostExerciseRequest {
        return exercise;
    }
    
    static fromAny(input: any): PostExerciseRequest {
        return ExerciseWithoutIdMapper.fromAny(input);
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