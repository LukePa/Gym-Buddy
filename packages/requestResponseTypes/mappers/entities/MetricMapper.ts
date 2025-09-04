import type Metric from "../../models/entities/metric";

export default class MetricMapper {
    static create(id: string, name: string): Metric {
        return {
            id,
            name
        }
    }
    
    static fromAny(input: any): Metric {
        if (!input.id || !input.name) throw new Error("Can not map metric without id or name property")
        
        return {
            id: input.id,
            name: input.name,
            isTracked: typeof input.isTracked === "boolean" ? input.isTracked : undefined,
            targetValue: typeof input.targetValue === "string" ? input.targetValue : undefined,
            units: typeof input.units === "string" ? input.units : undefined,
        }
    }
}