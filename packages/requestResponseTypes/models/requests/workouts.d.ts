import {WorkoutWithoutId} from "../entities/workout";

export interface GetWorkoutsRequest {}

export interface GetWorkoutRequest {}

export interface PostWorkoutRequest extends WorkoutWithoutId {}

export interface PutWorkoutRequest extends WorkoutWithoutId {}

export interface DeleteWorkoutRequest {}

export interface PostWorkoutExerciseRequest {}
