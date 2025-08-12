import {NextFunction, type RequestHandler, Response as ExResponse,
    Request as ExRequest,} from "express";
import {ApiError} from "../controllers/authController";


export const errorHandler = (err: unknown, req: ExRequest, res: ExResponse, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            name: err.name,
            message: err.message
        })
    }
}