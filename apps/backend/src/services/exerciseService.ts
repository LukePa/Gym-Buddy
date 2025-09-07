import ExerciseRepository from "../repositories/exerciseRepository";
import Exercise from "../entities/exercise";
import {ExerciseWithoutId} from "@gym-buddy/requestresponsetypes/models/entities/exercise";
import { randomUUID } from "node:crypto";

export default class ExerciseService {
    
    static async createExercise(exerciseData: ExerciseWithoutId): Promise<string> {
        // Generate a unique ID for the exercise
        const id = randomUUID();
        
        // Save to database (repository handles metric creation)
        return await ExerciseRepository.createExerciseFromDto(exerciseData, id);
    }
    
    static async getAllExercises(): Promise<Exercise[]> {
        return await ExerciseRepository.getAllExercises();
    }
    
    static async getExerciseById(id: string): Promise<Exercise | null> {
        return await ExerciseRepository.getExerciseById(id);
    }
    
    static async updateExercise(id: string, exerciseData: ExerciseWithoutId): Promise<void> {
        // Check if exercise exists
        const existingExercise = await ExerciseRepository.getExerciseById(id);
        if (!existingExercise) {
            throw new Error("Exercise not found");
        }
        
        // Update in database (repository handles metric manipulation)
        await ExerciseRepository.updateExerciseFromDto(id, exerciseData);
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