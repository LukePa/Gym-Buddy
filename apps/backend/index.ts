import express from "express";
import routes from "./src/routes";
import dotenv from "dotenv";
import cors from "cors";
import {errorHandler} from "./src/middleware/errorHandler";
import {notFound} from "./src/middleware/notFound";

dotenv.config()

const app = express();
const port = process.env.PORT || 5312;

app.use(express.json());
app.use(cors())
app.use("/", routes);
app.use(errorHandler);
app.use(notFound)

app.listen(port, () => {
    console.log("Server started on port: " + port);
})