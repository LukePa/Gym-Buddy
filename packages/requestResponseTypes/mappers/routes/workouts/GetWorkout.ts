import {GetWorkoutRequest} from "../../../models/requests/workouts";
import WorkoutWithIdMapper from "../../entities/WorkoutWithIdMapper";
import {GetWorkoutResponse} from "../../../models/responses/workouts";

export class GetWorkoutRequestMapper {
    static create(): GetWorkoutRequest {
        return {}
    }
    
    static fromAny(input: any): GetWorkoutRequest {
        return {}
    }
}

export class GetWorkoutResponseMapper {
    static create(id: string, name: string, userId: string, exerciseIds?: Array<string>): GetWorkoutResponse {
        return WorkoutWithIdMapper.create(id, name, userId, exerciseIds);
    }
    
    static fromAny(input: any): GetWorkoutResponse {
        return WorkoutWithIdMapper.fromAny(input)
    }
}
