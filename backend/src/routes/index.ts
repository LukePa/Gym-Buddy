import {Router} from "express";
import authRoutes from "./auth";
import exercisesRoutes from "./exercises";
import metricsRoutes from "./metrics";
import usersRoutes from "./users";
import workoutsRoutes from "./workouts";

const router = Router();

router.use("/auth", authRoutes);
router.use("/exercises", exercisesRoutes);
router.use("/metrics", metricsRoutes);
router.use("/users", usersRoutes);
router.use("/workouts", workoutsRoutes);

export default router;