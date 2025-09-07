import {WorkoutWithId as WorkoutDTO} from "@gym-buddy/requestresponsetypes/models/entities/workout";
import Workout from "../entities/workout";
import {Workout as WorkoutDBType} from "../database/db";

export default class WorkoutMapper {
    static fromDbType(input: WorkoutDBType): Workout {
        return new Workout(input.id, input.name, input.userId);
    }
    
    static toDbType(workout: Workout): WorkoutDBType {
        return {
            id: workout.id,
            name: workout.name,
            userId: workout.userId
        }
    }
    
    static fromDtoType(dto: WorkoutDTO): Workout {
        const workout = new Workout(dto.id, dto.name, dto.userId);
        workout.exerciseIds = dto.exerciseIds;
        return workout;
    }
    
    static toDtoType(workout: Workout): WorkoutDTO {
        return {
            id: workout.id,
            name: workout.name,
            userId: workout.userId,
            exerciseIds: workout.exerciseIds
        }
    }
}
