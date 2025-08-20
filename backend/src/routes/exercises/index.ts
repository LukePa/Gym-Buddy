import {Router} from "express";
import {authenticate} from "../../middleware/authenticate";

const router = Router();

router.use(authenticate);

// TODO: Add swagger docs
router.get("/", (req, res) => {
    console.log(req.userId)
    res.send("Get users exercises")
})

// TODO: Add swagger docs
router.get("/:id", (req, res) => {
    res.send("Get specific exercise")
})

// TODO: Add swagger docs
router.get("/:id/metrics", (req, res) => {
    res.send("Get all metrics for an exercise")
})

// TODO: Add swagger docs
router.post("/", (req, res) => {
    // Optionally include new metrics?
    res.send("Create new exercise")
})

// TODO: Add swagger docs
router.post("/:id", (req, res) => {
    res.send("Edit exercise")
})



export default router;