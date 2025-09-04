import {SqliteDialect} from "kysely";
import SQLite from "better-sqlite3";


const dialect = new SqliteDialect({
    database: new SQLite("database.sqlite")
})

export default dialect;