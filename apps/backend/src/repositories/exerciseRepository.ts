import {db} from "../database";
import Exercise from "../entities/exercise";
import ExerciseMapper from "../mappers/exerciseMapper";
import MetricRepository from "./metricRepository";
import MetricMapper from "../mappers/metricMapper";
import {ExerciseWithoutId} from "@gym-buddy/requestresponsetypes/models/entities/exercise";
import WorkoutRepository from "./workoutRepository.ts";

export default class ExerciseRepository {
    
    static async createExerciseFromEntityForUser(exercise: Exercise, userId: string): Promise<string> {
        const dbObject = ExerciseMapper.toDbType(exercise, userId);
        
        const result = await db.insertInto("exercise")
            .values(dbObject)
            .returning("id")
            .executeTakeFirst();
        
        if (!result) {
            throw new Error("Failed to create exercise");
        }
        
        // Handle metrics if they exist
        if (exercise.metrics && exercise.metrics.length > 0) {
            for (const metric of exercise.metrics) {
                await MetricRepository.createMetric(metric);
            }
        }
        
        return result.id;
    }
    
    static async updateExerciseFromEntityForUser(id: string, exercise: Exercise, userId: string): Promise<void> {
        // First check if the exercise exists and belongs to the user
        const existingExercise = await db.selectFrom("exercise")
            .selectAll()
            .where("id", "=", id)
            .where("userId", "=", userId)
            .executeTakeFirst();
        
        if (!existingExercise) {
            throw new Error("Exercise not found");
        }
        
        // Update exercise
        await db.updateTable("exercise")
            .set(ExerciseMapper.toDbType(exercise, userId))
            .where("id", "=", id)
            .where("userId", "=", userId)
            .execute();
        
        // Delete existing metrics
        await MetricRepository.removeAllMetricsForExercise(id);
        
        // Insert new metrics if they exist
        if (exercise.metrics && exercise.metrics.length > 0) {
            for (const metric of exercise.metrics) {
                await MetricRepository.createMetric(metric);
            }
        }
    }
    
    static async getAllExercisesForUser(userId: string): Promise<Exercise[]> {
        const exercises = await db.selectFrom("exercise")
            .selectAll()
            .where("userId", "=", userId)
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
    
    static async getExerciseByIdForUser(id: string, userId: string): Promise<Exercise | null> {
        const exercise = await db.selectFrom("exercise")
            .selectAll()
            .where("id", "=", id)
            .where("userId", "=", userId)
            .executeTakeFirst();
        
        if (!exercise) {
            return null;
        }
        
        const metrics = await MetricRepository.getMetricsForExercise(id);
        
        const exerciseEntity = ExerciseMapper.fromDbType(exercise);
        exerciseEntity.metrics = metrics;
        
        return exerciseEntity;
    }
    
    static async removeExerciseFromAllWorkouts(exerciseId: string): Promise<void> {
        await db.deleteFrom("workoutExercises")
            .where("exerciseId", "=", exerciseId)
            .execute()
    }
    
    static async deleteExerciseForUser(id: string, userId: string): Promise<void> {
        // Delete metrics first (foreign key constraint)
        await MetricRepository.removeAllMetricsForExercise(id);
        
        // Delete exercise
        await db.deleteFrom("exercise")
            .where("id", "=", id)
            .where("userId", "=", userId)
            .execute();
        
        await this.removeExerciseFromAllWorkouts(id);
    }
}