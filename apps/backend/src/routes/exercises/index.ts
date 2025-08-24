import {Router} from "express";
import {authenticate} from "../../middleware/authenticate";

const router = Router();

router.use(authenticate);

router.get("/", (req, res) => {
    console.log(req.userId)
    res.send("Get users exercises")
})

router.get("/:id", (req, res) => {
    res.send("Get specific exercise")
})

router.get("/:id/metrics", (req, res) => {
    res.send("Get all metrics for an exercise")
})

router.post("/", (req, res) => {
    // Optionally include new metrics?
    res.send("Create new exercise")
})

router.post("/:id", (req, res) => {
    res.send("Edit exercise")
})



export default router;