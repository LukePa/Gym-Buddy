import {DB} from "./db";
import {Kysely} from "kysely";
import dialect from "./dbDialect";

export const db = new Kysely<DB>({dialect})