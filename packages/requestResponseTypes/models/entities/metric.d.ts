

export default interface Metric {
    id: string;
    name: string;
    isTracked?: boolean;
    targetValue?: string;
    units?: string;
}