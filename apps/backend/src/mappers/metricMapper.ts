import {Metric} from "../entities/metric";
import {ExerciseMetrics} from "../database/db";
import MetricDTO from "@gym-buddy/requestresponsetypes/models/entities/metric";


export default class MetricMapper {
    static fromDbType(input: ExerciseMetrics): Metric {
        const metric = new Metric(input.exerciseId, input.name);
        if (input.units !== null) metric.units = input.units;
        if (input.targetValue !== null) {
            const convertedValue = Number.parseFloat(input.targetValue);
            if (Number.isNaN(convertedValue)) throw new Error("Tried to parse metric with float target value")
            metric.targetValue = convertedValue;
        }
        return metric;
    }
    
    static toDbType(metric: Metric): ExerciseMetrics {
        return {
            exerciseId: metric.exerciseId,
            name: metric.name,
            targetValue: metric.targetValue !== undefined ? String(metric.targetValue) : null,
            units: metric.units !== undefined ? metric.units : null,
        }
    }
    
    static toDtoType(metric: Metric): MetricDTO {
        return {
            name: metric.name,
            units: metric.units,
            targetValue: metric.targetValue,
        }
    }
    
    static fromDtoType(dto: MetricDTO, exerciseId: string): Metric {
        const metric = new Metric(exerciseId, dto.name);
        metric.targetValue = dto.targetValue;
        metric.units = dto.units;
        return metric;
    }
}