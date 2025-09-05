import {ExerciseWithId as ExerciseDTO} from "@gym-buddy/requestresponsetypes/models/entities/exercise";
import Exercise from "../entities/exercise";
import {Exercise as ExerciseDBType} from "../database/db";
import MetricMapper from "./metricMapper";


export default class ExerciseMapper {
    static fromDbType(input: ExerciseDBType): Exercise {
        return new Exercise(input.id, input.name);
    }
    
    static toDbType(exercise: Exercise): ExerciseDBType {
        return {
            id: exercise.id,
            name: exercise.name
        }
    }
    
    static fromDtoType(dto: ExerciseDTO): Exercise {
        const exercise = new Exercise(dto.id, dto.name);
        if (dto.metrics) {
            exercise.metrics = dto.metrics.map(m => {
                return MetricMapper.fromDtoType(m, dto.id)
            })
        }
        return exercise;
    }
    
    static toDtoType(exercise: Exercise): ExerciseDTO {
        let metrics = exercise.metrics?.map(MetricMapper.toDtoType) 
        
        return {
            id: exercise.id,
            name: exercise.name,
            metrics
        }
    }
}