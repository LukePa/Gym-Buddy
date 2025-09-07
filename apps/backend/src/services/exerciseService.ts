import ExerciseRepository from "../repositories/exerciseRepository";
import Exercise from "../entities/exercise";

export default class ExerciseService {
    
    static async createExercise(exercise: Exercise): Promise<string> {
        return await ExerciseRepository.createExerciseFromEntity(exercise);
    }
    
    static async getAllExercises(): Promise<Exercise[]> {
        return await ExerciseRepository.getAllExercises();
    }
    
    static async getExerciseById(id: string): Promise<Exercise | null> {
        return await ExerciseRepository.getExerciseById(id);
    }
    
    static async updateExercise(id: string, exercise: Exercise): Promise<void> {
        // Check if exercise exists
        const existingExercise = await ExerciseRepository.getExerciseById(id);
        if (!existingExercise) {
            throw new Error("Exercise not found");
        }
        
        await ExerciseRepository.updateExerciseFromEntity(id, exercise);
    }
    
    static async deleteExercise(id: string): Promise<void> {
        // Check if exercise exists
        const existingExercise = await ExerciseRepository.getExerciseById(id);
        if (!existingExercise) {
            throw new Error("Exercise not found");
        }
        
        // Delete from database
        await ExerciseRepository.deleteExercise(id);
    }
}