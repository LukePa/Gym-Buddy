import type Metric from "../../models/entities/metric";

export default class MetricMapper {
    static create(name: string): Metric {
        return {
            name
        }
    }
    
    static fromAny(input: any): Metric {
        if (!input.name) throw new Error("Can not map metric without id or name property")
        
        return {
            name: input.name,
            targetValue: typeof input.targetValue === "number" ? input.targetValue : undefined,
            units: typeof input.units === "string" ? input.units : undefined,
        }
    }
}