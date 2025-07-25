import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable("user")
        .addColumn("id", "integer", col => col.primaryKey())
        .addColumn("email", "text", col => col.notNull())
        .execute()
}


export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("user").ifExists().execute()
}