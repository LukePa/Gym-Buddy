import * as UserAuthRepository from "../repositories/userAuthRepository";
import {scryptSync, randomBytes} from "node:crypto";

export async function addUserPassword(userId: string, password: string) {
    const salt = randomBytes(16).toString("base64");
    const hashedPassword = scryptSync(password, salt, 64).toString("base64");
    await UserAuthRepository.createUserAuth(userId, hashedPassword, salt);
}

export async function getUserPasswordAndSalt(username: string) {
    return await UserAuthRepository.getPasswordAndSaltForUsername(username);
}

export async function verifyLogin(username: string, password: string) {
    const passwordAndSalt = await UserAuthRepository.getPasswordAndSaltForUsername(username);
    if (!passwordAndSalt) return false;
    
    const retrievedPassword = passwordAndSalt.password;
    const salt = passwordAndSalt.salt;
    
    const hashedPassword = scryptSync(password, salt, 64).toString("base64");
    return retrievedPassword === hashedPassword;
}