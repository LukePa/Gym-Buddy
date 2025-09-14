import {PostWorkoutRequest} from "../../../models/requests/workouts";
import {PostWorkoutResponse} from "../../../models/responses/workouts";
import {WorkoutWithoutId} from "../../../models/entities/workout";
import WorkoutWithoutIdMapper from "../../entities/WorkoutWithoutIdMapper";
import WorkoutWithIdMapper from "../../entities/WorkoutWithIdMapper.ts";

export class PostWorkoutRequestMapper {
    static create(workout: WorkoutWithoutId): PostWorkoutRequest {
        return workout;
    }
    
    static fromAny(input: any): PostWorkoutRequest {
        return WorkoutWithoutIdMapper.fromAny(input);
    }
}

export class PostWorkoutResponseMapper {
    static create(id: string, name: string, exerciseIds: Array<string>): PostWorkoutResponse {
        return WorkoutWithIdMapper.create(id, name, exerciseIds);
    }
    
    static fromAny(input: any): PostWorkoutResponse {
        return WorkoutWithIdMapper.fromAny(input);
    }
}
