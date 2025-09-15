import {ExerciseWithoutId} from "../../models/entities/exercise";
import {Metric} from "../../models/entities/metric";
import MetricMapper from "./MetricMapper";


export default class ExerciseWithoutIdMapper {
    static create(name: string, metrics?: Array<Metric>): ExerciseWithoutId {
        return {
            name,
            metrics
        }
    }

    static fromAny(input: any): ExerciseWithoutId {
        if(!input.name) throw new Error("Can not map exercise without name")

        return {
            name: input.name,
            metrics: Array.isArray(input.metrics) ? input.metrics.map(MetricMapper.fromAny) : undefined
        }
    }
}