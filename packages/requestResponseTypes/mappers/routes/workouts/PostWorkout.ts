import {PostWorkoutRequest} from "../../../models/requests/workouts";
import {PostWorkoutResponse} from "../../../models/responses/workouts";
import {WorkoutWithoutId} from "../../../models/entities/workout";
import WorkoutWithoutIdMapper from "../../entities/WorkoutWithoutIdMapper";

export class PostWorkoutRequestMapper {
    static create(workout: WorkoutWithoutId): PostWorkoutRequest {
        return workout;
    }
    
    static fromAny(input: any): PostWorkoutRequest {
        return WorkoutWithoutIdMapper.fromAny(input);
    }
}

export class PostWorkoutResponseMapper {
    static create(): PostWorkoutResponse {
        return {};
    }
    
    static fromAny(input: any): PostWorkoutResponse {
        return {};
    }
}
