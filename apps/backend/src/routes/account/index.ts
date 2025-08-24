import {Router} from "express";
import * as UserAuthService from "../../services/userAuthService";
import * as UserService from "../../services/userService";
import {UsernamePasswordRequest} from "../../requestTypes/account/usernamePassword";

const router = Router();

router.post("/login", async (req, res) => {
    let formattedRequest: UsernamePasswordRequest;
    try {
        formattedRequest = UsernamePasswordRequest.fromRequestBody(req.body)
    } catch(e) {
        res.status(400)
            .send({error: UsernamePasswordRequest.failMessage})
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
    
    res.status(200).send({token: jwt})
})

router.post("/create", async (req, res) => {
    let formattedRequest: UsernamePasswordRequest;
    try {
        formattedRequest = UsernamePasswordRequest.fromRequestBody(req.body)
    } catch(e) {
        res.status(400)
            .send({error: UsernamePasswordRequest.failMessage})
        return;
    }
    
    await UserService.createNewUser(formattedRequest.username, formattedRequest.password)
    res.status(201).send("User created successfully")
})

export default router;