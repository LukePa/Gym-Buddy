import {db} from "../database"
import {User, UserUpdate, NewUser} from "../database/types";

export async function createUser(user: NewUser) {
    return await db.insertInto('user')
        .values(user)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export async function getUser(id: number) {
    return await db.selectFrom('user')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
}

export async function getAllUsers() {
    return await db.selectFrom('user')
        .selectAll()
        .execute()
}