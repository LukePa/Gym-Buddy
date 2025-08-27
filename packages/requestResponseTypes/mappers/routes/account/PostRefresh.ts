import {PostRefreshRequest} from "../../../models/requests/account";
import {PostRefreshResponse} from "../../../models/responses/account";


export class PostRefreshRequestMapper {
    static create(): PostRefreshRequest {
        return {}
    }

    static fromAny(input: any): PostRefreshRequest {
        return {}
    }
}

export class PostRefreshResponseMapper {
    static create(token: string): PostRefreshResponse {
        return {token}
    }

    static fromAny(input: any): PostRefreshResponse {
        if (!input.token) throw new Error("Can not create refresh response without 'token' property")

        return {token: input.token};
    }
}