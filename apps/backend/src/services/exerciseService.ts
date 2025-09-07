import ExerciseRepository from "../repositories/exerciseRepository";
import Exercise from "../entities/exercise";

export default class ExerciseService {
    
    static async createExercise(exercise: Exercise, userId: string): Promise<string> {
        return await ExerciseRepository.createExerciseFromEntityForUser(exercise, userId);
    }
    
    static async getAllExercisesForUser(userId: string): Promise<Exercise[]> {
        return await ExerciseRepository.getAllExercisesForUser(userId);
    }
    
    static async getExerciseByIdForUser(id: string, userId: string): Promise<Exercise | null> {
        return await ExerciseRepository.getExerciseByIdForUser(id, userId);
    }
    
    static async updateExercise(id: string, exercise: Exercise, userId: string): Promise<void> {
        await ExerciseRepository.updateExerciseFromEntityForUser(id, exercise, userId);
    }
    
    static async deleteExerciseForUser(id: string, userId: string): Promise<void> {
        await ExerciseRepository.deleteExerciseForUser(id, userId);
    }
}