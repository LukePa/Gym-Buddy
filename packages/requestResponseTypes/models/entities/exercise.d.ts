import Metric from "./metric";


export default interface Exercise {
    id: string;
    name: string;
    metrics?: Array<Metric>
}