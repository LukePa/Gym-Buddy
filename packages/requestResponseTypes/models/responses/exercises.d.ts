import Exercise from "../entities/exercise";


export interface GetExercisesResponse extends Array<Exercise> {}

export interface GetExerciseResponse extends Exercise {}