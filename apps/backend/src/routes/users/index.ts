import {Router} from "express";
import * as UserService from "../../services/userService";
import * as UserAuthService from "../../services/userAuthService";
import {authenticate} from "../../middleware/authenticate";

const router = Router();

router.use(authenticate);

export default router;