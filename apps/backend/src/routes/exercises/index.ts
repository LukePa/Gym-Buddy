import {Router} from "express";
import {authenticate} from "../../middleware/authenticate";
import {RequestTest} from "@gym-buddy/requestresponsetypes/requests/requestTest";


const router = Router();

router.use(authenticate);

// TESTING
router.post("/test", async (req, res) => {
    const response: RequestTest = {prop1: "test prop"};
    res.status(200).send({body: response})
})

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