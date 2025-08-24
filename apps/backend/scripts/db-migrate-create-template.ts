import * as path from "node:path";
import fs from "node:fs";

function addLeadingZero(num: number): string {
    const str = num.toString();
    if (str.length < 2) return `0${str}`
    return str;
}

const currentDate = new Date(Date.now())
const formattedDate = `${currentDate.getFullYear()}-${addLeadingZero(currentDate.getMonth() + 1)}-${addLeadingZero(currentDate.getDate())}`
const formattedTime = `${addLeadingZero(currentDate.getHours())}${addLeadingZero(currentDate.getMinutes())}` 
const migrationFileName = `${formattedDate}T${formattedTime}.ts`;
const migrationFilePath = path.join(__dirname, "../src/database/migration/migrations", migrationFileName);

const template = fs.readFileSync(path.join(__dirname, "./templates/migration-file-template.ts"));
fs.writeFileSync(migrationFilePath, template)

console.log(`Migration file saved at ${migrationFilePath}`)

