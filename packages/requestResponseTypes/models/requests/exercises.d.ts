import {ExerciseWithoutId} from "../entities/exercise";


export interface GetExercisesRequest {}

export interface GetExerciseRequest {}

export interface PostExerciseRequest extends ExerciseWithoutId {}

export interface PutExerciseRequest extends ExerciseWithoutId {}

export interface DeleteExerciseRequest {}