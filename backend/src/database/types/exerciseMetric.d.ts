import {Generated, Insertable, Selectable, Updateable} from "kysely";

export interface ExerciseMetricTable {
    id: Generated<number>
    exerciseId: number
    name: string
    Target: number | null
    Unit: string | null
}

export type ExerciseMetric = Selectable<ExerciseMetricTable>
export type NewExerciseMetric = Insertable<ExerciseMetricTable>
export type ExerciseMetricUpdate = Updateable<ExerciseMetricTable>