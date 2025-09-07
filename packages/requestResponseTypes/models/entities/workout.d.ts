export interface WorkoutWithoutId {
    name: string;
    exerciseIds?: Array<string>
}

export interface WorkoutWithId extends WorkoutWithoutId {
    id: string;
    userId: string;
}
