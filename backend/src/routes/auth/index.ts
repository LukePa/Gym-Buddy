import {Router} from "express";
import * as UserAuthService from "../../services/userAuthService";

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
    res.status(200).send(verified)
})

export default router;