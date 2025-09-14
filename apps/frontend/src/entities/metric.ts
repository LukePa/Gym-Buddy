import {Metric as MetricDTO} from "@gym-buddy/requestresponsetypes/models/entities/metric";

export default class Metric {
    name: string;
    targetValue: number;
    units: string;
    
    constructor(name: string, targetValue: number, units: string) {
        this.name = name;
        this.targetValue = targetValue;
        this.units = units;
    }
    
    static fromDTO(dto: MetricDTO): Metric {
        return new Metric(dto.name, 0, dto.units ?? "");
    } 
    
    toDTO(): MetricDTO {
        return {
            name: this.name,
            targetValue: this.targetValue,
            units: this.units
        }
    }
}