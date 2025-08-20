import {Router} from "express";
import {authenticate} from "../../middleware/authenticate";

const router = Router();


router.use(authenticate);

// TODO: Add swagger docs
router.get("/", (req, res) => {
    res.send("Get users workouts")
})

// TODO: Add swagger docs
router.get("/:id", (req, res) => {
  res.send("Get specific user workout")
})

// TODO: Add swagger docs
router.get("/:id/exercises", (req, res) => {
    res.send("Get all exercises from a workout")
})

// TODO: Add swagger docs
router.post("/", (req, res) => {
    res.send("Create workout")
})

// TODO: Add swagger docs
router.post("/:id", (req, res) => {
    res.send("edit workout")
})

// TODO: Add swagger docs
router.post("/:id/:exerciseId", (req, res) => {
    res.send("Add existing exercise to workout")
})


export default router;