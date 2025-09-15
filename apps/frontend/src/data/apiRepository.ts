import Exercise from "../entities/exercise.ts";
import Workout from "../entities/workouts.ts";
import IRepository from "../models/IRepository.js";
import getExercises from "../requests/exercises/getExercises.ts";
import Metric from "../entities/metric.js";
import postExercise from "../requests/exercises/postExercise.ts";
import putExercise from "../requests/exercises/putExercise.js";
import {PostExerciseRequest, PutExerciseRequest} from "@gym-buddy/requestresponsetypes/models/requests/exercises";
import getWorkouts from "../requests/workouts/getWorkouts.js";
import putWorkout from "../requests/workouts/putWorkout.js";
import deleteExercise from "../requests/exercises/deleteExercise.js";
import {PostWorkoutRequest} from "@gym-buddy/requestresponsetypes/models/requests/workouts";
import postWorkout from "../requests/workouts/postWorkout.js";
import deleteWorkout from "../requests/workouts/deleteWorkout.js";


export default class ApiRepository implements IRepository {
    async getAllExercises(): Promise<Array<Exercise>> {
        const getExercisesResponse = await getExercises();
        return getExercisesResponse.map(Exercise.fromExerciseWithIdDTO);
    }
    async getAllWorkouts(): Promise<Array<Workout>> {
        const response = await getWorkouts();
        return response.map(Workout.fromDTO);
    }
    async updateExercise(exercise: Exercise, workoutId?: string): Promise<void> {
        const request: PutExerciseRequest = exercise.toExerciseWithoutIDDTO();
        if (workoutId) request.workoutId = workoutId;
        await putExercise(exercise.id, request);
        return;
    }
    async updateWorkout(workout: Workout): Promise<void> {
        await putWorkout(workout.id, workout.toDTOWithoutId())
    }
    async deleteExercise(exerciseID: string): Promise<void> {
        await deleteExercise(exerciseID);
    }
    async deleteWorkout(workoutID: string): Promise<void> {
        await deleteWorkout(workoutID);
    }
    
    async createExercise(name: string, metrics: Array<Metric>, workoutId?: string): Promise<Exercise> {
        const request: PostExerciseRequest = {
            name,
            metrics: metrics.map(metric => metric.toDTO()),
            workoutId
        }
        const response = await postExercise(request);
        
        return Exercise.fromExerciseWithIdDTO(response);
    }
    
    async createWorkout(name: string, exerciseIds: Array<string>): Promise<Workout> {
        const request: PostWorkoutRequest = {
            name,
            exerciseIds
        }
        
        const res = await postWorkout(request);
        return Workout.fromDTO(res);
    }
}