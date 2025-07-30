import {Router} from "express";
import * as UserAuthService from "../../services/userAuthService";

const router = Router();

router.get("/", (req, res) => {
    res.send("Auth base route")
})

router.post("/login", async (req, res) => {
    const verified = await UserAuthService.verifyLogin("test@test.com", "testpassword")
    res.status(200).send(verified)
})

export default router;