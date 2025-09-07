import {WorkoutWithoutId} from "../../models/entities/workout";

export default class WorkoutWithoutIdMapper {
    static create(name: string, exerciseIds?: Array<string>): WorkoutWithoutId {
        return {
            name,
            exerciseIds
        }
    }
    
    static fromAny(input: any): WorkoutWithoutId {
        if(!input.name) throw new Error("Can not map workout without name")
        
        return {
            name: input.name,
            exerciseIds: Array.isArray(input.exerciseIds) ? input.exerciseIds : undefined
        }
    }
}
