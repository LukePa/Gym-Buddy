


export class Metric {
    exerciseId: string
    name: string;
    targetValue?: number;
    units?: string;
    
    constructor(exerciseId: string, name: string) {
        this.exerciseId = exerciseId;
        this.name = name;
    }
}