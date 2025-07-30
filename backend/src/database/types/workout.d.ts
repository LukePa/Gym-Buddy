import {Generated, Insertable, Selectable, Updateable} from "kysely";

export interface WorkoutTable {
    id: Generated<number>
    userId: number
    name: string
}

export type Workout = Selectable<WorkoutTable>
export type NewWorkout = Insertable<WorkoutTable>
export type WorkoutUpdate = Updateable<WorkoutTable>