import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable("user")
        .addColumn("id", "integer", col => col.primaryKey().autoIncrement().unique())
        .addColumn("email", "text", col => col.notNull())
        .execute()
    
    await db.schema
        .createTable("userAuth")
        .addColumn("userId", "integer", col => col.references("user.id").primaryKey())
        .addColumn("password", "text", col => col)
        .execute()
}


export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("user").ifExists().execute()
    await db.schema.dropTable("userAuth").ifExists().execute()
}