import {db} from "../database";
import Exercise from "../entities/exercise";
import ExerciseMapper from "../mappers/exerciseMapper";
import MetricRepository from "./metricRepository";
import MetricMapper from "../mappers/metricMapper";
import {ExerciseWithoutId} from "@gym-buddy/requestresponsetypes/models/entities/exercise";

export default class ExerciseRepository {
    
    static async createExerciseFromDto(exerciseData: ExerciseWithoutId, id: string): Promise<string> {
        // Create the exercise entity without metrics
        const exercise = new Exercise(id, exerciseData.name);
        const dbObject = ExerciseMapper.toDbType(exercise);
        
        const result = await db.insertInto("exercise")
            .values(dbObject)
            .returning("id")
            .executeTakeFirst();
        
        if (!result) {
            throw new Error("Failed to create exercise");
        }
        
        // Handle metrics if they exist
        if (exerciseData.metrics && exerciseData.metrics.length > 0) {
            for (const metricDto of exerciseData.metrics) {
                const metric = MetricMapper.fromDtoType(metricDto, id);
                await MetricRepository.createMetric(metric);
            }
        }
        
        return result.id;
    }
    
    static async updateExerciseFromDto(id: string, exerciseData: ExerciseWithoutId): Promise<void> {
        // Update exercise
        await db.updateTable("exercise")
            .set({ name: exerciseData.name })
            .where("id", "=", id)
            .execute();
        
        // Delete existing metrics
        await MetricRepository.removeAllMetricsForExercise(id);
        
        // Insert new metrics if they exist
        if (exerciseData.metrics && exerciseData.metrics.length > 0) {
            for (const metricDto of exerciseData.metrics) {
                const metric = MetricMapper.fromDtoType(metricDto, id);
                await MetricRepository.createMetric(metric);
            }
        }
    }
    
    static async getAllExercises(): Promise<Exercise[]> {
        const exercises = await db.selectFrom("exercise")
            .selectAll()
            .execute();
        
        const result: Exercise[] = [];
        
        for (const exercise of exercises) {
            const metrics = await MetricRepository.getMetricsForExercise(exercise.id);
            
            const exerciseEntity = ExerciseMapper.fromDbType(exercise);
            exerciseEntity.metrics = metrics;
            
            result.push(exerciseEntity);
        }
        
        return result;
    }
    
    static async getExerciseById(id: string): Promise<Exercise | null> {
        const exercise = await db.selectFrom("exercise")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst();
        
        if (!exercise) {
            return null;
        }
        
        const metrics = await MetricRepository.getMetricsForExercise(id);
        
        const exerciseEntity = ExerciseMapper.fromDbType(exercise);
        exerciseEntity.metrics = metrics;
        
        return exerciseEntity;
    }
    
    static async deleteExercise(id: string): Promise<void> {
        // Delete metrics first (foreign key constraint)
        await MetricRepository.removeAllMetricsForExercise(id);
        
        // Delete exercise
        await db.deleteFrom("exercise")
            .where("id", "=", id)
            .execute();
    }
}