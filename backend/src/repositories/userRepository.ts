import {db} from "../database"


export async function createUser(id: string, username: string) {
    return await db.insertInto('user')
        .values({id, username})
        .executeTakeFirst()
}

export async function getUserById(id: string) {
    return await db.selectFrom('user')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
}

export async function getUserByUsername(username: string) {
    return await db.selectFrom('user')
        .where('username', '=', username)
        .selectAll()
        .executeTakeFirst()
}

export async function getAllUsers() {
    return await db.selectFrom('user')
        .selectAll()
        .execute()
}