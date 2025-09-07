export default class Workout {
    id: string;
    name: string;
    userId: string;
    
    exerciseIds?: Array<string>
    
    constructor(id: string, name: string, userId: string) {
        this.id = id;
        this.name = name;
        this.userId = userId;
    }
}
