import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    // Migration up logic here
    
    // Example:
    // await db.schema
    //     .createTable("user")
    //     .addColumn("id", "integer", col => col.primaryKey())
    //     .addColumn("email", "text", col => col.notNull())
    //     .execute()
    
    throw new Error("Tried to migrate up to a template migration")
}


export async function down(db: Kysely<any>): Promise<void> {
    // Migration down logic here
    
    // Example:
    //await db.schema.dropTable("user").ifExists().execute()

    throw new Error("Tried to migrate down to a template migration")
}