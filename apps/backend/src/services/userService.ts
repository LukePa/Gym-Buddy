import * as UserRepository from '../repositories/userRepository';
import * as UserAuthService from "./userAuthService";
import {randomUUID} from "node:crypto";
import {addUserPassword} from "./userAuthService";
import jwt from "jsonwebtoken";

export async function createNewUser(username: string, password: string) {
    const id = randomUUID();
    await UserRepository.createUser(id, username);
    await UserAuthService.addUserPassword(id, password);
}

export async function getUserById(id: string) {
    //return await UserRepository.getUserById(id);
    //
}

export async function getUserByName(name: string) {
    return await UserRepository.getUserByUsername(name);
}

// TO REMOVE
export async function getAllUsers() {
   return await UserRepository.getAllUsers();
}