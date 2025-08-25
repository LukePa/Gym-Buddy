import {ErrorResponse} from "../../models/responses/error";


export class ErrorResponseMapper {
    static create(message: string): ErrorResponse {
        return {error: message};
    }
    
    static fromAny(input: any): ErrorResponse {
        if (!input.error) throw new Error("Can not map to error response without 'error' property")
        return {error: input.error};
    }
}