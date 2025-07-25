import {Generated, Insertable, Selectable, Updateable} from "kysely";


export interface Database {
    user: UserTable
    userAuth: UserAuthTable
    workout: WorkoutTable
    workoutExercise: WorkoutExerciseTable
    exercise: ExerciseTable
    exerciseMetric: ExerciseMetricTable
}



export interface UserTable {
    id: Generated<number>
    email: string
}

export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>


export interface UserAuthTable {
    userId: number
    password: string
}

export type UserAuth = Selectable<UserAuthTable>
export type NewUserAuth = Insertable<UserAuthTable>
export type UserAuthUpdate = Updateable<UserAuthTable>


export interface WorkoutTable {
    id: Generated<number>
    userId: number
    name: string
}

export type Workout = Selectable<WorkoutTable>
export type NewWorkout = Insertable<WorkoutTable>
export type WorkoutUpdate = Updateable<WorkoutTable>


export interface WorkoutExerciseTable {
    id: Generated<number>
    workoutId: number
    exerciseId: number
}

export type WorkoutExercise = Selectable<WorkoutTable>
export type NewWorkoutExercise = Insertable<WorkoutTable>
export type WorkoutExerciseUpdate = Updateable<WorkoutTable>


export interface ExerciseTable {
    id: Generated<number>
    name: string
}

export type Exercise = Selectable<WorkoutTable>
export type NewExercise = Insertable<WorkoutTable>
export type ExerciseUpdate = Updateable<WorkoutTable>

export interface ExerciseMetricTable {
    id: Generated<number>
    exerciseId: number
    name: string
    Target: number | null
    Unit: string | null
}

export type ExerciseMetric = Selectable<WorkoutTable>
export type NewExerciseMetric = Insertable<WorkoutTable>
export type ExerciseMetricUpdate = Updateable<WorkoutTable>