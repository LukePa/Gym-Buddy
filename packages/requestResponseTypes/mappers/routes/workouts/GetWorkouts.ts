import {GetWorkoutsRequest} from "../../../models/requests/workouts";
import {GetWorkoutsResponse} from "../../../models/responses/workouts";
import {WorkoutWithId} from "../../../models/entities/workout";
import WorkoutWithIdMapper from "../../entities/WorkoutWithIdMapper";

export class GetWorkoutsRequestMapper {
    static create(): GetWorkoutsRequest {
        return {}
    }
    
    static fromAny(): GetWorkoutsRequest {
        return {}
    }
}

export class GetWorkoutsResponseMapper {
    static create(workouts: Array<WorkoutWithId>): GetWorkoutsResponse {
        return workouts;
    }
    
    static fromAny(input: any): GetWorkoutsResponse {
        if(!Array.isArray(input)) throw new Error("Can not map GetWorkoutsResponse on non array");
        
        return input.map(WorkoutWithIdMapper.fromAny);
    }
}
