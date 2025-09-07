import WorkoutRepository from "../repositories/workoutRepository";
import Workout from "../entities/workout";
import Exercise from "../entities/exercise";

export default class WorkoutService {
    
    static async createWorkout(workout: Workout): Promise<string> {
        return await WorkoutRepository.createWorkoutFromEntity(workout);
    }
    
    static async getAllWorkoutsForUser(userId: string): Promise<Workout[]> {
        return await WorkoutRepository.getAllWorkoutsForUser(userId);
    }
    
    static async getWorkoutById(id: string, userId: string): Promise<Workout | null> {
        return await WorkoutRepository.getWorkoutById(id, userId);
    }
    
    static async updateWorkout(id: string, workout: Workout, userId: string): Promise<void> {
        // Check if workout exists and belongs to user
        const existingWorkout = await WorkoutRepository.getWorkoutById(id, userId);
        if (!existingWorkout) {
            throw new Error("Workout not found");
        }
        
        await WorkoutRepository.updateWorkoutFromEntity(id, workout, userId);
    }
    
    static async deleteWorkout(id: string, userId: string): Promise<void> {
        // Check if workout exists and belongs to user
        const existingWorkout = await WorkoutRepository.getWorkoutById(id, userId);
        if (!existingWorkout) {
            throw new Error("Workout not found");
        }
        
        await WorkoutRepository.deleteWorkout(id, userId);
    }
    
    static async addExerciseToWorkout(workoutId: string, exerciseId: string, userId: string): Promise<void> {
        await WorkoutRepository.addExerciseToWorkout(workoutId, exerciseId, userId);
    }
    
    static async getWorkoutExercises(workoutId: string, userId: string): Promise<Exercise[]> {
        return await WorkoutRepository.getWorkoutExercises(workoutId, userId);
    }
}
