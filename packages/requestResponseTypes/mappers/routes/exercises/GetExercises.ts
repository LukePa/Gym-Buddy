import {GetExercisesRequest} from "../../../models/requests/exercises";
import {GetExercisesResponse} from "../../../models/responses/exercises";
import Exercise from "../../../models/entities/exercise";
import ExerciseMapper from "../../entities/ExerciseMapper";


export class GetExercisesRequestMapper {
    static create(): GetExercisesRequest {
        return {}
    }
    
    static fromAny(): GetExercisesRequest {
        return {}
    }
}


export class GetExercisesResponseMapper {
    static create(exercises: Array<Exercise>): GetExercisesResponse {
        return exercises;
    }
    
    static fromAny(input: any): GetExercisesResponse {
        if(!Array.isArray(input)) throw new Error("Can not map GetExerciseResponse on non array");
        
        return input.map(ExerciseMapper.fromAny);
    }
}