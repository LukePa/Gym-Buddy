import {Router} from "express";
import * as UserAuthService from "../../services/userAuthService";
import * as UserService from "../../services/userService";

const router = Router();

router.get("/", (req, res) => {
    res.send("Auth base route")
})

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if (typeof username !== "string" || typeof password !== "string") {
        res.status(400).send({error: "Must supply username and password"})
    }
    
    const verified = await UserAuthService.verifyLogin(username, password)
    
    if (!verified) {
        res.status(401).send({error: "Invalid username or password"});
        return;
    }
    
    const user = await UserService.getUserByName(username);
    if (!user) throw new Error();
    
    const jwt = await UserAuthService.generateJWT(user.id)
    
    res.status(200).send(jwt)
})

export default router;