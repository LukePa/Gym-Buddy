import {WorkoutWithId} from "../../models/entities/workout";

export default class WorkoutWithIdMapper {
    static create(id: string, name: string, userId: string, exerciseIds?: Array<string>): WorkoutWithId {
        return {
            id,
            name,
            userId,
            exerciseIds
        }
    }
    
    static fromAny(input: any): WorkoutWithId {
        if(!input.id || !input.name || !input.userId) throw new Error("Can not map workout without id, name, or userId")
        
        return {
            id: input.id,
            name: input.name,
            userId: input.userId,
            exerciseIds: Array.isArray(input.exerciseIds) ? input.exerciseIds : undefined
        }
    }
}
