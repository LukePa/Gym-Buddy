import {Router} from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Users base route")
})


export default router;