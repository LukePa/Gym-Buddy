import {PostLoginRequest} from "../../../models/requests/account";
import {PostLoginResponse} from "../../../models/responses/account";


export class PostLoginRequestMapper {
    static create(username: string, password: string): PostLoginRequest {
        return {
            username, password
        }
    } 
    
    static fromAny(input: any): PostLoginRequest {
        if (!input.username || !input.password) {
            throw new Error("LoginRequestMapper.fromAny must be called with username and password")
        }
        
        return {
            username: input.username,
            password: input.password
        }
    }
}

export class PostLoginResponseMapper {
    static create(token: string): PostLoginResponse {
        return {token}
    }
    
    static fromAny(input: any): PostLoginResponse {
        if (!input.token) throw new Error("Can not create login response")
        
        return {token: input.token};
    }
}