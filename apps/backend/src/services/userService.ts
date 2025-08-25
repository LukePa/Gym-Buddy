import * as UserRepository from '../repositories/userRepository';
import * as UserAuthService from "./userAuthService";
import {randomUUID} from "node:crypto";

export async function createNewUser(username: string, password: string): Promise<string> {
    const id = randomUUID();
    await UserRepository.createUser(id, username);
    await UserAuthService.addUserPassword(id, password);
    return id;
}

export async function hasExistingUser(username: string): Promise<boolean> {
    const existingUser = await UserRepository.getUserByUsername(username);
    return Boolean(existingUser);
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