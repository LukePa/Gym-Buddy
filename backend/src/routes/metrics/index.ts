import {Router} from "express";
import {authenticate} from "../../middleware/authenticate";

const router = Router();

router.use(authenticate);

router.get("/", (req, res) => {
    res.send("Metrics base route")
})


export default router;