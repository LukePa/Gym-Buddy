import * as UserRepository from '../repositories/userRepository';

export async function createNewUser(email: string, password: string) {
    const user = await UserRepository.createUser({email})
}

export async function getUserById(id: number) {
    return await UserRepository.getUser(id);
}

export async function getAllUsers() {
    return await UserRepository.getAllUsers();
}