import {WorkoutWithId} from "../../models/entities/workout";

export default class WorkoutWithIdMapper {
    static create(id: string, name: string, exerciseIds?: Array<string>): WorkoutWithId {
        return {
            id,
            name,
            exerciseIds
        }
    }
    
    static fromAny(input: any): WorkoutWithId {
        if(!input.id || !input.name) throw new Error("Can not map workout without id, name, or userId")
        
        return {
            id: input.id,
            name: input.name,
            exerciseIds: Array.isArray(input.exerciseIds) ? input.exerciseIds : undefined
        }
    }
}
