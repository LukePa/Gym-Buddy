import {Router} from "express";
import {authenticate} from "../../middleware/authenticate";


const router = Router();

router.use(authenticate);


router.get("/", (req, res) => {
    res.send("Get all exercises")
})

router.get("/:id", (req, res) => {
    res.send("Get specific exercise")
})

router.post("/", (req, res) => {
    res.send("Create new exercise")
})

router.put("/:id", (req, res) => {
    res.send("Edit exercise")
})


router.delete("/:id", (req, res) => {
    res.send("Delete exercise")
})


export default router;