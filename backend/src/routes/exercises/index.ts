import {Router} from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Exercises base route")
})


export default router;