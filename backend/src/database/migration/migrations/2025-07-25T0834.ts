import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable("user")
        .addColumn("id", "text", col => col.primaryKey().unique().notNull())
        .addColumn("username", "text", col => col.notNull().unique())
        .execute()
    
    await db.schema
        .createTable("userAuth")
        .addColumn("userId", "text", col => col.references("user.id").primaryKey())
        .addColumn("password", "text", col => col.notNull())
        .addColumn("salt", "text", col => col.notNull())
        .execute()
}


export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("user").ifExists().execute()
    await db.schema.dropTable("userAuth").ifExists().execute()
}