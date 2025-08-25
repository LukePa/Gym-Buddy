import {PostCreateRequest} from "../../../models/requests/account";
import {PostCreateResponse} from "../../../models/responses/account";


export class PostCreateRequestMapper {
    static create(username: string, password: string): PostCreateRequest {
        return {
            username, password
        }
    }
    
    static fromAny(input: any): PostCreateRequest {
        if (!input.username || !input.password) {
            throw new Error("LoginRequestMapper.fromAny must be called with username and password")
        }

        return {
            username: input.username,
            password: input.password
        }
    }
}


export class PostCreateResponseMapper {
    static create(token: string): PostCreateResponse {
        return {token}
    }
    
    static fromAny(input: any): PostCreateResponse {
        if (!input.token) throw new Error("Can not create login response")

        return {token: input.token};
    }
}