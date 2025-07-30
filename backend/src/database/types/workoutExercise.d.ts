import {Generated, Insertable, Selectable, Updateable} from "kysely";

export interface WorkoutExerciseTable {
    id: Generated<number>
    workoutId: number
    exerciseId: number
}

export type WorkoutExercise = Selectable<WorkoutExerciseTable>
export type NewWorkoutExercise = Insertable<WorkoutExerciseTable>
export type WorkoutExerciseUpdate = Updateable<WorkoutExerciseTable>