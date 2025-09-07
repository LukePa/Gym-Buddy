import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable("user")
        .addColumn("id", "text", col => col.primaryKey().unique().notNull())
        .addColumn("username", "text", col => col.notNull().unique())
        .execute()

    await db.schema
        .createTable("userAuth")
        .addColumn("userId", "text", col => col.references("user.id").primaryKey().notNull())
        .addColumn("password", "text", col => col.notNull())
        .addColumn("salt", "text", col => col.notNull())
        .execute()

    await db.schema
        .createTable("workout")
        .addColumn("id", "text", col => col.notNull().primaryKey().unique())
        .addColumn("userId", "text", col => col.notNull().references("user.id"))
        .addColumn("name", "text", col => col.notNull())
        .execute()

    await db.schema
        .createTable("exercise")
        .addColumn("id", "text", col => col.primaryKey().notNull().unique())
        .addColumn("name", "text", col => col.notNull())
        .addColumn("userId", "text", col => col.notNull().references("user.id"))
        .execute()

    await db.schema
        .createTable("exerciseMetrics")
        .addColumn("exerciseId", "text", col => col.notNull().references("exercise.id"))
        .addColumn("name", "text", col => col.notNull())
        .addColumn("targetValue", "float4")
        .addColumn("units", "text")
        .addPrimaryKeyConstraint("primary_key", ['exerciseId', 'name'])
        .execute()
    
    await db.schema
        .createTable("workoutExercises")
        .addColumn("id", "text", col => col.primaryKey().notNull().unique())
        .addColumn("workoutId", "text", col => col.notNull().references("workout.id"))
        .addColumn("exerciseId", "text", col => col.notNull().references("exercise.id"))
        .execute()

}


export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("user").ifExists().execute()
    await db.schema.dropTable("userAuth").ifExists().execute()
    await db.schema.dropTable("exercise").ifExists().execute()
    await db.schema.dropTable("workoutExercises").ifExists().execute()
    await db.schema.dropTable("exerciseMetrics").ifExists().execute()
    await db.schema.dropTable("metricLogs").ifExists().execute()
}