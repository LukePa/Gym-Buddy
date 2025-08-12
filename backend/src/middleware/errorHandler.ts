import {NextFunction, type RequestHandler, Response as ExResponse,
    Request as ExRequest,} from "express";
import {ApiError} from "../controllers/authController";
import {ValidateError} from "tsoa";


export const errorHandler = (err: unknown, req: ExRequest, res: ExResponse, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            name: err.name,
            message: err.message
        })
    }
    
    if (err instanceof ValidateError) {
        return res.status(err.status).json({
            name: err.name,
            message: err.message,
            fields: err.fields
        })
    }
}