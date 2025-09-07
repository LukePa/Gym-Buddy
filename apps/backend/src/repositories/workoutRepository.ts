import {db} from "../database";
import Workout from "../entities/workout";
import WorkoutMapper from "../mappers/workoutMapper";
import ExerciseMapper from "../mappers/exerciseMapper";
import Exercise from "../entities/exercise";
import { randomUUID } from "node:crypto";

export default class WorkoutRepository {
    
    static async createWorkoutFromEntity(workout: Workout): Promise<string> {
        const dbObject = WorkoutMapper.toDbType(workout);
        
        const result = await db.insertInto("workout")
            .values(dbObject)
            .returning("id")
            .executeTakeFirst();
        
        if (!result) {
            throw new Error("Failed to create workout");
        }
        
        // Handle exercise IDs if they exist
        if (workout.exerciseIds && workout.exerciseIds.length > 0) {
            for (const exerciseId of workout.exerciseIds) {
                const workoutExerciseId = randomUUID();
                await db.insertInto("workoutExercises")
                    .values({
                        id: workoutExerciseId,
                        workoutId: workout.id,
                        exerciseId: exerciseId
                    })
                    .execute();
            }
        }
        
        return result.id;
    }
    
    static async getAllWorkoutsForUser(userId: string): Promise<Workout[]> {
        const workouts = await db.selectFrom("workout")
            .selectAll()
            .where("userId", "=", userId)
            .execute();
        
        const result: Workout[] = [];
        
        for (const workout of workouts) {
            // Get exercise IDs for this workout
            const workoutExercises = await db.selectFrom("workoutExercises")
                .select("exerciseId")
                .where("workoutId", "=", workout.id)
                .execute();
            
            const workoutEntity = WorkoutMapper.fromDbType(workout);
            workoutEntity.exerciseIds = workoutExercises.map(we => we.exerciseId);
            
            result.push(workoutEntity);
        }
        
        return result;
    }
    
    static async getWorkoutById(id: string, userId: string): Promise<Workout | null> {
        const workout = await db.selectFrom("workout")
            .selectAll()
            .where("id", "=", id)
            .where("userId", "=", userId)
            .executeTakeFirst();
        
        if (!workout) {
            return null;
        }
        
        // Get exercise IDs for this workout
        const workoutExercises = await db.selectFrom("workoutExercises")
            .select("exerciseId")
            .where("workoutId", "=", id)
            .execute();
        
        const workoutEntity = WorkoutMapper.fromDbType(workout);
        workoutEntity.exerciseIds = workoutExercises.map(we => we.exerciseId);
        
        return workoutEntity;
    }
    
    static async updateWorkoutFromEntity(id: string, workout: Workout, userId: string): Promise<void> {
        // First check if the workout exists and belongs to the user
        const existingWorkout = await db.selectFrom("workout")
            .selectAll()
            .where("id", "=", id)
            .where("userId", "=", userId)
            .executeTakeFirst();
        
        if (!existingWorkout) {
            throw new Error("Workout not found");
        }
        
        // Update workout
        await db.updateTable("workout")
            .set({ name: workout.name })
            .where("id", "=", id)
            .where("userId", "=", userId)
            .execute();
        
        // Delete existing workout exercises
        await db.deleteFrom("workoutExercises")
            .where("workoutId", "=", id)
            .execute();
        
        // Insert new exercise IDs if they exist
        if (workout.exerciseIds && workout.exerciseIds.length > 0) {
            for (const exerciseId of workout.exerciseIds) {
                const workoutExerciseId = randomUUID();
                await db.insertInto("workoutExercises")
                    .values({
                        id: workoutExerciseId,
                        workoutId: id,
                        exerciseId: exerciseId
                    })
                    .execute();
            }
        }
    }
    
    static async deleteWorkout(id: string, userId: string): Promise<void> {
        // First check if the workout exists and belongs to the user
        const existingWorkout = await db.selectFrom("workout")
            .selectAll()
            .where("id", "=", id)
            .where("userId", "=", userId)
            .executeTakeFirst();
        
        if (!existingWorkout) {
            throw new Error("Workout not found");
        }
        
        // Delete workout exercises first (foreign key constraint)
        await db.deleteFrom("workoutExercises")
            .where("workoutId", "=", id)
            .execute();
        
        // Delete workout
        await db.deleteFrom("workout")
            .where("id", "=", id)
            .where("userId", "=", userId)
            .execute();
    }
    
    static async addExerciseToWorkout(workoutId: string, exerciseId: string, userId: string): Promise<void> {
        // Verify workout belongs to user
        const workout = await db.selectFrom("workout")
            .select("id")
            .where("id", "=", workoutId)
            .where("userId", "=", userId)
            .executeTakeFirst();
        
        if (!workout) {
            throw new Error("Workout not found or access denied");
        }
        
        // Verify exercise exists and belongs to user
        const exercise = await db.selectFrom("exercise")
            .select("id")
            .where("id", "=", exerciseId)
            .where("userId", "=", userId)
            .executeTakeFirst();
        
        if (!exercise) {
            throw new Error("Exercise not found");
        }
        
        // Add exercise to workout
        const id = randomUUID();
        await db.insertInto("workoutExercises")
            .values({
                id,
                workoutId,
                exerciseId
            })
            .execute();
    }
    
    static async getWorkoutExercises(workoutId: string, userId: string): Promise<Exercise[]> {
        // Verify workout belongs to user
        const workout = await db.selectFrom("workout")
            .select("id")
            .where("id", "=", workoutId)
            .where("userId", "=", userId)
            .executeTakeFirst();
        
        if (!workout) {
            throw new Error("Workout not found or access denied");
        }
        
        // Get exercises for this workout
        const workoutExercises = await db.selectFrom("workoutExercises")
            .innerJoin("exercise", "workoutExercises.exerciseId", "exercise.id")
            .selectAll("exercise")
            .where("workoutExercises.workoutId", "=", workoutId)
            .execute();
        
        return workoutExercises.map(we => ExerciseMapper.fromDbType(we));
    }
}
