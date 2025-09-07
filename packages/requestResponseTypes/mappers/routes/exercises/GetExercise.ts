import {GetExerciseRequest} from "../../../models/requests/exercises";
import ExerciseWithIdMapper from "../../entities/ExerciseWithIdMapper";
import {GetExerciseResponse} from "../../../models/responses/exercises";
import Metric from "../../../models/entities/metric";


export class GetExerciseRequestMapper {
    static create(): GetExerciseRequest {
        return {}
    }
    
    static fromAny(input: any): GetExerciseRequest {
        return {}
    }
}


export class GetExerciseResponseMapper {
    static create(id: string, name: string, metrics?: Array<Metric>): GetExerciseResponse {
        return ExerciseWithIdMapper.create(id, name, metrics);
    }
    
    static fromAny(input: any): GetExerciseResponse {
        return ExerciseWithIdMapper.fromAny(input)
    }
}