import {Router} from "express";
import * as UserService from "../../services/userService";

const router = Router();

router.get("/", (req, res) => {
    res.send("Auth base route")
})

router.post("/create", async (req, res) => {
    await UserService.createNewUser("test@test.com", "testpassword")
})

router.get("/users", async (req, res) => {
    const users = await UserService.getAllUsers();
    
    res.status(200).send(users);
})

export default router;