import {Insertable, Selectable, Updateable} from "kysely";

export interface UserAuthTable {
    userId: number
    password: string
}

export type UserAuth = Selectable<UserAuthTable>
export type NewUserAuth = Insertable<UserAuthTable>
export type UserAuthUpdate = Updateable<UserAuthTable>