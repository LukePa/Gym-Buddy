import * as UserRepository from '../repositories/userRepository';
import * as UserAuthService from "./userAuthService";
import {randomUUID} from "node:crypto";
import {addUserPassword} from "./userAuthService";

export async function createNewUser(username: string, password: string) {
    const id = randomUUID();
    await UserRepository.createUser(id, username);
    await UserAuthService.addUserPassword(id, password);
}

export async function getUserById(id: string) {
    //return await UserRepository.getUserById(id);
    //
}


// TO REMOVE
export async function getAllUsers() {
   return await UserRepository.getAllUsers();
}