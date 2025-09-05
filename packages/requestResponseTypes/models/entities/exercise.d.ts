import Metric from "./metric";


export interface ExerciseWithoutId {
    name: string;
    metrics?: Array<Metric>
}

export interface ExerciseWithId extends  ExerciseWithoutId {
    id: string;
}



