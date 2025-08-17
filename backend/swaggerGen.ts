import fs from "node:fs";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import definition from "./swaggerDefinition";

const options = {
    definition,
    apis: ['./src/routes/**/*.ts', './src/entities/**/*.ts']
}

const spec = swaggerJSDoc(options);
fs.writeFileSync(path.join(__dirname, "swagger.json"), JSON.stringify(spec, undefined, "\t"));
