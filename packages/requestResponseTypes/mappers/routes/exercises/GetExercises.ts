import {GetExercisesRequest} from "../../../models/requests/exercises";
import {GetExercisesResponse} from "../../../models/responses/exercises";
import {ExerciseWithId} from "../../../models/entities/exercise";
import ExerciseWithIdMapper from "../../entities/ExerciseWithIdMapper";


export class GetExercisesRequestMapper {
    static create(): GetExercisesRequest {
        return {}
    }
    
    static fromAny(): GetExercisesRequest {
        return {}
    }
}


export class GetExercisesResponseMapper {
    static create(exercises: Array<ExerciseWithId>): GetExercisesResponse {
        return exercises;
    }
    
    static fromAny(input: any): GetExercisesResponse {
        if(!Array.isArray(input)) throw new Error("Can not map GetExerciseResponse on non array");
        
        return input.map(ExerciseWithIdMapper.fromAny);
    }
}