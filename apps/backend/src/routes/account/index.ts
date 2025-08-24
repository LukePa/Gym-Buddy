import {Router} from "express";
import * as UserAuthService from "../../services/userAuthService";
import * as UserService from "../../services/userService";
import {UsernamePasswordRequestMapper} from "../../requestTypes/account/usernamePassword";
import type {LoginRequest} from "@gym-buddy/requestresponsetypes/requests/account";
import type {LoginResponse} from "@gym-buddy/requestresponsetypes/responses/account";

const router = Router();

router.post("/login", async (req, res) => {
    let formattedRequest: LoginRequest;
    try {
        formattedRequest = UsernamePasswordRequestMapper.fromRequestBody(req.body);
    } catch(e) {
        res.status(400)
            .send({error: UsernamePasswordRequestMapper.failMessage})
        return;
    }
    
    const verified = await UserAuthService.verifyLogin(
        formattedRequest.username,
        formattedRequest.password
    )
    
    if (!verified) {
        res.status(401).send({error: "Invalid username or password"});
        return;
    }
    
    const user = await UserService.getUserByName(formattedRequest.username);
    if (!user) throw new Error();
    
    const jwt = await UserAuthService.generateJWT(user.id)
    const response: LoginResponse = {token: jwt};
    res.status(200).send(response)
})

router.post("/create", async (req, res) => {
    let formattedRequest: UsernamePasswordRequestMapper;
    try {
        formattedRequest = UsernamePasswordRequestMapper.fromRequestBody(req.body)
    } catch(e) {
        res.status(400)
            .send({error: UsernamePasswordRequestMapper.failMessage})
        return;
    }
    
    await UserService.createNewUser(formattedRequest.username, formattedRequest.password)
    res.status(201).send("User created successfully")
})

export default router;