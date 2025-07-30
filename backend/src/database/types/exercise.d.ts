import {Generated, Insertable, Selectable, Updateable} from "kysely";

export interface ExerciseTable {
    id: Generated<number>
    name: string
    userID: number
}

export type Exercise = Selectable<ExerciseTable>
export type NewExercise = Insertable<ExerciseTable>
export type ExerciseUpdate = Updateable<ExerciseTable>