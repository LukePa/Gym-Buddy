import {db} from "../database"


export async function createUser(email: string) {
    return await db.insertInto('user')
        .values({email})
        .executeTakeFirst()
}

export async function getUserById(id: number) {
    return await db.selectFrom('user')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
}

export async function getUserByEmail(email: string) {
    return await db.selectFrom('user')
        .where('email', '=', email)
        .select(['id', 'email'])
        .executeTakeFirst()
}

export async function getAllUsers() {
    return await db.selectFrom('user')
        .selectAll()
        .execute()
}