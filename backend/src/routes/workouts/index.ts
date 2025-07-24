import {Router} from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Workouts base route")
})


export default router;