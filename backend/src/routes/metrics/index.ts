import {Router} from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Metrics base route")
})


export default router;