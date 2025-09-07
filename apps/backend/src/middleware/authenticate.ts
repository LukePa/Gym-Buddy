import {type RequestHandler} from "express";
import * as UserAuthService from "../services/userAuthService";
import {type JwtPayload} from "jsonwebtoken";

export const authenticate: RequestHandler = (req, res, next)=>  {
    if (!req.headers.authorization) {
        res.status(400).send({error: "Authorization header required"});
        return;
    }
    
    let token: string | JwtPayload
    try {
        token = UserAuthService.verifyJwtTokenAndReturnDecoded(req.headers.authorization.replace("Bearer ", ""))
    } catch (e) {
        res.status(400).send({error: e});
        return;
    }
    
    if (typeof token !== "object") {
        res.status(500).send({error: "Invalid token"});
        return;
    }
    
    const userId = token.userId;
    if (!userId || typeof userId !== "string") {
        res.status(500).send({error: "Invalid user id in token"});
        return;
    }
    
    req.userId = userId;
    
    next()
}