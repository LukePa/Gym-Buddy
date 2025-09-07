import {db} from "../database";
import MetricMapper from "../mappers/metricMapper";
import {Metric} from "../entities/metric";

export default class MetricRepository {
    
    
    static async getMetricsForExercise(exerciseId: string): Promise<Metric[]> {
        const values = await db.selectFrom("exerciseMetrics")
            .where("exerciseId",  "=", exerciseId)
            .selectAll()
            .execute()
        
        return values.map(MetricMapper.fromDbType);
    }
    
    static async removeAllMetricsForExercise(exerciseId: string) {
        await db.deleteFrom("exerciseMetrics")
            .where("exerciseId", "=", exerciseId)
            .execute()
    }
    
    static async removeMetrics(exerciseId: string, names: Array<string>) {
        await db.deleteFrom("exerciseMetrics")
            .where("exerciseId", "=", exerciseId)
            .where("name", "in", names)
            .execute()
    }
    
    static async createMetric(metric: Metric) {
        const metricDatabaseObject = MetricMapper.toDbType(metric);
        await db.insertInto("exerciseMetrics")
            .values(metricDatabaseObject)
            .execute()
    }
    
    static async updateMetric(metric: Metric) {
        const metricDatabaseObject = MetricMapper.toDbType(metric);
        await db.updateTable("exerciseMetrics")
            .set(exMetric => metricDatabaseObject)
            .where("exerciseId", "=", metricDatabaseObject.exerciseId)
            .where("name", "=", metricDatabaseObject.name)
            .execute()
    }
}