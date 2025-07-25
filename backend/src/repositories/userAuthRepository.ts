import {db} from "../database"
import {UserAuth, UserAuthUpdate, NewUserAuth} from "../database/types";

export async function createUserAuth(userAuth: NewUserAuth) {
    return await db.insertInto('userAuth')
        .values(userAuth)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export async function getUserAuth(id: number) {
    return await db.selectFrom('userAuth')
        .where('userId', '=', id)
        .selectAll()
        .executeTakeFirst()
}