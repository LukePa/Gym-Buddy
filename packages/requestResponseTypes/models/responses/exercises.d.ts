import {ExerciseWithId, ExerciseWithoutId} from "../entities/exercise";


export interface GetExercisesResponse extends Array<ExerciseWithId> {}


export interface GetExerciseResponse extends ExerciseWithId {}


export interface PostExerciseResponse extends ExerciseWithId {}

export interface PutExerciseResponse {}

export interface DeleteExerciseResponse {}