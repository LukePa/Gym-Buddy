import Exercise from "../entities/exercise.ts";
import Workout from "../entities/workouts.ts";
import IRepository from "../models/IRepository.js";
import getExercises from "../requests/exercises/getExercises.ts";
import Metric from "../entities/metric.js";
import postExercise from "../requests/exercises/postExercise.ts";
import putExercise from "../requests/exercises/putExercise.js";


export default class ApiRepository implements IRepository {
    async getAllExercises(): Promise<Array<Exercise>> {
        const getExercisesResponse = await getExercises();
        return getExercisesResponse.map(Exercise.fromExerciseWithIdDTO);
    }
    getAllWorkouts(): Promise<Array<Workout>> {
        throw new Error("Method not implemented.");
    }
    async updateExercise(exercise: Exercise): Promise<void> {
        await putExercise(exercise.id, exercise.toExerciseWithoutIDDTO());
        return;
    }
    updateWorkout(workout: Workout): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteExercise(exerciseID: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteWorkout(workoutID: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    async createExercise(name: string, metrics: Array<Metric>): Promise<Exercise> {
        const response = await postExercise({
            name, 
            metrics: metrics.map(metric => metric.toDTO())
        });
        
        return Exercise.fromExerciseWithIdDTO(response);
    }
    
    createWorkout(name: string, exerciseIds: Array<string>): Promise<Workout> {
        throw new Error("Method not implimented")
    }
}