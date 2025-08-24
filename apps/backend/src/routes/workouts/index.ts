import {Router} from "express";
import {authenticate} from "../../middleware/authenticate";

const router = Router();


router.use(authenticate);

router.get("/", (req, res) => {
    res.send("Get users workouts")
})

router.get("/:id", (req, res) => {
  res.send("Get specific user workout")
})

router.get("/:id/exercises", (req, res) => {
    res.send("Get all exercises from a workout")
})

router.post("/", (req, res) => {
    res.send("Create workout")
})

router.post("/:id", (req, res) => {
    res.send("edit workout")
})

router.post("/:id/:exerciseId", (req, res) => {
    res.send("Add existing exercise to workout")
})


export default router;