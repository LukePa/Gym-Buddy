import {Metric} from "../metric";


export default class Exercise {
    id: string;
    name: string;
    
    metrics?: Array<Metric>
    
    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}