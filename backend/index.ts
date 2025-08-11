import express from "express";
import routes from "./src/routes";
import dotenv from "dotenv";
import {RegisterRoutes} from "./build/routes"

dotenv.config()

const app = express();
const port = process.env.PORT || 5312;

app.use(express.json());

RegisterRoutes(app)

app.use("/", routes);
app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(port, () => {
    console.log("Server started on port: " + port);
})