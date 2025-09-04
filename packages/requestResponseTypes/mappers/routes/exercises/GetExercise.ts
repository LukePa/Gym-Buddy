import {GetExerciseRequest} from "../../../models/requests/exercises";
import ExerciseMapper from "../../entities/ExerciseMapper";
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
        return ExerciseMapper.create(id, name);
    }
    
    static fromAny(input: any): GetExerciseResponse {
        return ExerciseMapper.fromAny(input)
    }
}