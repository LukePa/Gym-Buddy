import {WorkoutWithId, WorkoutWithoutId} from "@gym-buddy/requestresponsetypes/models/entities/workout";


export default class Workout {
    id: string;
    name: string;
    exercises: Array<string>
    
    constructor(id: string, name: string, exercises: Array<string>) {
        this.id = id;
        this.name = name;
        this.exercises = exercises;
    }
    
    static fromDTO(dto: WorkoutWithId): Workout {
        return new Workout(dto.id, dto.name, dto.exerciseIds ?? [])
    }
    
    toDTO(): WorkoutWithId {
        return {
            id: this.id,
            name: this.name,
            exerciseIds: this.exercises
        }
    }
    
    toDTOWithoutId(): WorkoutWithoutId {
        return {
            name: this.name,
            exerciseIds: this.exercises
        }
    }
}