import {Router} from "express";
import {authenticate} from "../../middleware/authenticate";

const router = Router();

router.use(authenticate);

router.get("/", (req, res) => {
    console.log(req.userId)
    res.send("Exercises base route")
})


export default router;