import Exercise from "../entities/exercise.js";
import Workout from "../entities/workouts.js";
import Metric from "../entities/metric.js";


export default interface IRepository {
    getAllExercises(): Promise<Array<Exercise>>
    getAllWorkouts(): Promise<Array<Workout>>
    updateExercise(exercise: Exercise): Promise<void>
    updateWorkout(workout: Workout): Promise<void>
    deleteExercise(exerciseID: string): Promise<void>
    deleteWorkout(workoutID: string): Promise<void>
    createExercise(name: string, metrics: Array<Metric>): Promise<Exercise>
    createWorkout(name: string, exerciseIDs: Array<string>): Promise<Workout>
}