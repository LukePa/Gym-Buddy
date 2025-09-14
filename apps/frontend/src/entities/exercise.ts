import {ExerciseWithId, ExerciseWithoutId} from "@gym-buddy/requestresponsetypes/models/entities/exercise";
import Metric from "./metric.ts";


export default class Exercise {
    id: string
    name: string
    metrics: Array<Metric>
    
    constructor(id: string, name: string, metrics: Array<Metric>) {
        this.id = id;
        this.name = name;
        this.metrics = metrics;
    }
    
    static fromExerciseWithIdDTO(dto: ExerciseWithId): Exercise {
        const metrics = dto.metrics?.map(Metric.fromDTO) ?? [];
        return new Exercise(dto.id, dto.name, metrics)
    }
    
    toExerciseWithIdDTO(): ExerciseWithId {
        return {
            id: this.id,
            name: this.name,
            metrics: this.metrics.map(metric => metric.toDTO())
        }
    }
    
    toExerciseWithoutIDDTO(): ExerciseWithoutId {
        return {
            name: this.name,
            metrics: this.metrics.map(metric => metric.toDTO())
        }
    }
    
    
}