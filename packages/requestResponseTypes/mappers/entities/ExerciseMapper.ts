import Exercise from "../../models/entities/exercise";
import Metric from "../../models/entities/metric";
import MetricMapper from "./MetricMapper";


export default class ExerciseMapper {
    static create(id: string, name: string, metrics?: Array<Metric>): Exercise {
        return {
            id,
            name,
            metrics
        }
    }
    
    static fromAny(input: any): Exercise {
        if(!input.id || !input.name) throw new Error("Can not map exercise without name or id")
        
        return {
            id: input.id,
            name: input.name,
            metrics: Array.isArray(input.metrics) ? input.metrics.map(MetricMapper.fromAny) : undefined
        }
    }
}