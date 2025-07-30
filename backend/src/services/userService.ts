import * as UserRepository from '../repositories/userRepository';

export async function createNewUser(email: string, password: string) {
    await UserRepository.createUser({email})
    const user = await UserRepository.getUserByEmail(email)
    
    
    
}

export async function getUserById(id: number) {
    return await UserRepository.getUserById(id);
}

export async function getAllUsers() {
    return await UserRepository.getAllUsers();
}