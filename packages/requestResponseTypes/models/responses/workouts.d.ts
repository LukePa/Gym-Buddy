import {WorkoutWithId, WorkoutWithoutId} from "../entities/workout";
import {ExerciseWithId} from "../entities/exercise";

export interface GetWorkoutsResponse extends Array<WorkoutWithId> {}

export interface GetWorkoutResponse extends WorkoutWithId {}

export interface GetWorkoutExercisesResponse extends Array<ExerciseWithId> {}

export interface PostWorkoutResponse extends WorkoutWithId {}

export interface PutWorkoutResponse {}

export interface DeleteWorkoutResponse {}

export interface PostWorkoutExerciseResponse {}
