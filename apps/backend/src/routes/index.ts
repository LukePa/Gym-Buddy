import {Router} from "express";
import accountRoutes from "./account";
import exercisesRoutes from "./exercises";
import metricsRoutes from "./metrics";
import usersRoutes from "./users";
import workoutsRoutes from "./workouts";

const router = Router();

router.use("/account", accountRoutes);
router.use("/exercises", exercisesRoutes);
router.use("/metrics", metricsRoutes);
router.use("/users", usersRoutes);
router.use("/workouts", workoutsRoutes);

export default router;