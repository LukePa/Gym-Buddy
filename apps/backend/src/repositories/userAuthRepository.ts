import {db} from "../database"

export async function createUserAuth(userId: string, password: string, salt: string) {
    return await db.insertInto('userAuth')
        .values({userId, password, salt})
        .returningAll()
        .executeTakeFirstOrThrow()
}

export async function getUserAuth(id: string) {
    return await db.selectFrom('userAuth')
        .where('userId', '=', id)
        .selectAll()
        .executeTakeFirst()
}

export async function getPasswordAndSaltForUsername(username: string) {
    return await db.selectFrom('userAuth')
        .innerJoin('user', 'user.id', 'userAuth.userId')
        .where("user.username", "=", username)
        .select(['password', 'salt'])
        .executeTakeFirst()
}