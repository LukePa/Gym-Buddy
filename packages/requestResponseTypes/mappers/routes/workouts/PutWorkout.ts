import {PutWorkoutRequest} from "../../../models/requests/workouts";
import {PutWorkoutResponse} from "../../../models/responses/workouts";
import {WorkoutWithoutId} from "../../../models/entities/workout";
import WorkoutWithoutIdMapper from "../../entities/WorkoutWithoutIdMapper";

export class PutWorkoutRequestMapper {
    static create(workout: WorkoutWithoutId): PutWorkoutRequest {
        return workout;
    }

    static fromAny(input: any): PutWorkoutRequest {
        return WorkoutWithoutIdMapper.fromAny(input);
    }
}

export class PutWorkoutResponseMapper {
    static create(): PutWorkoutResponse {
        return {};
    }

    static fromAny(input: any): PutWorkoutResponse {
        return {};
    }
}
