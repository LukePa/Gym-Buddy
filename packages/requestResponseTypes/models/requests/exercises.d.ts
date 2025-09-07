import {ExerciseWithoutId} from "../entities/exercise";


export interface GetExercisesRequest {}

export interface GetExerciseRequest {}

export interface PostExerciseRequest extends ExerciseWithoutId {
    workoutId?: string;
}

export interface PutExerciseRequest extends ExerciseWithoutId {
    workoutId?: string;
}

export interface DeleteExerciseRequest {}