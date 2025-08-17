import {Router} from "express";
import * as UserService from "../../services/userService";
import * as UserAuthService from "../../services/userAuthService";
import {authenticate} from "../../middleware/authenticate";

const router = Router();

router.use(authenticate);

router.get("/", (req, res) => {
    res.send("Users base route")
})

router.post("/create", async (req, res) => {
    await UserService.createNewUser("test@test.com", "testpassword")
    res.status(201).send("User created successfully")
})

// TODO: Remove this, this is only here for testing stuff
router.get("/users", async (req, res) => {
    const users = await UserService.getAllUsers();

    res.status(200).send(users);
})

router.get("/test", async (req, res) => {
    const t = await UserAuthService.getUserPasswordAndSalt("test@test.com")
    res.status(200).send(t);
})

router

export default router;