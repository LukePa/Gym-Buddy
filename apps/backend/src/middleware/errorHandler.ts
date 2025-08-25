import {ErrorRequestHandler} from "express";
import {ErrorResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/errorResponse";


export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(500).send(ErrorResponseMapper.create("Something has gone wrong"))
}