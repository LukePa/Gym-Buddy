import {Router} from "express";
import {authenticate} from "../../middleware/authenticate";
import WorkoutService from "../../services/workoutService";
import WorkoutMapper from "../../mappers/workoutMapper";
import ExerciseMapper from "../../mappers/exerciseMapper";
import Workout from "../../entities/workout";
import {ErrorResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/errorResponse";
import WorkoutWithoutIdMapper from "@gym-buddy/requestresponsetypes/mappers/entities/WorkoutWithoutIdMapper";
import {
    GetWorkoutsRequestMapper,
    GetWorkoutsResponseMapper
} from "@gym-buddy/requestresponsetypes/mappers/routes/workouts/GetWorkouts";
import {
    GetWorkoutRequestMapper,
    GetWorkoutResponseMapper
} from "@gym-buddy/requestresponsetypes/mappers/routes/workouts/GetWorkout";
import {
    PostWorkoutRequestMapper,
    PostWorkoutResponseMapper
} from "@gym-buddy/requestresponsetypes/mappers/routes/workouts/PostWorkout";
import {
    PutWorkoutRequestMapper,
    PutWorkoutResponseMapper
} from "@gym-buddy/requestresponsetypes/mappers/routes/workouts/PutWorkout";
import {
    DeleteWorkoutRequestMapper,
    DeleteWorkoutResponseMapper
} from "@gym-buddy/requestresponsetypes/mappers/routes/workouts/DeleteWorkout";
import { randomUUID } from "node:crypto";

const router = Router();

router.use(authenticate);

// GET /workouts - Get all workouts for the authenticated user
router.get("/", async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(500).send(ErrorResponseMapper.create("User ID not found in request"));
            return;
        }
        
        const workouts = await WorkoutService.getAllWorkoutsForUser(userId);
        const response = GetWorkoutsResponseMapper.create(
            workouts.map(workout => WorkoutMapper.toDtoType(workout))
        );
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(ErrorResponseMapper.create("Failed to fetch workouts"));
    }
});

// GET /workouts/:id - Get specific workout
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        if (!userId) {
            res.status(500).send(ErrorResponseMapper.create("User ID not found in request"));
            return;
        }
        
        const workout = await WorkoutService.getWorkoutById(id, userId);
        
        if (!workout) {
            res.status(404).send(ErrorResponseMapper.create("Workout not found"));
            return;
        }
        
        const response = GetWorkoutResponseMapper.create(
            workout.id,
            workout.name,
            workout.userId,
            workout.exerciseIds
        );
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(ErrorResponseMapper.create("Failed to fetch workout"));
    }
});

// GET /workouts/:id/exercises - Get all exercises from a workout
router.get("/:id/exercises", async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        if (!userId) {
            res.status(500).send(ErrorResponseMapper.create("User ID not found in request"));
            return;
        }
        
        const exercises = await WorkoutService.getWorkoutExercises(id, userId);
        const response = exercises.map(exercise => ExerciseMapper.toDtoType(exercise));
        res.status(200).send(response);
    } catch (error) {
        if (error instanceof Error && error.message === "Workout not found or access denied") {
            res.status(404).send(ErrorResponseMapper.create("Workout not found"));
        } else {
            res.status(500).send(ErrorResponseMapper.create("Failed to fetch workout exercises"));
        }
    }
});

// POST /workouts - Create new workout
router.post("/", async (req, res) => {
    try {
        let formattedRequest;
        try {
            formattedRequest = PostWorkoutRequestMapper.fromAny(req.body);
        } catch (e) {
            res.status(400).send(ErrorResponseMapper.create("Invalid request shape for workout creation"));
            return;
        }
        
        const userId = req.userId;
        if (!userId) {
            res.status(500).send(ErrorResponseMapper.create("User ID not found in request"));
            return;
        }
        
        // Generate ID and create workout entity
        const id = randomUUID();
        const workout = new Workout(id, formattedRequest.name, userId);
        workout.exerciseIds = formattedRequest.exerciseIds;
        
        const workoutId = await WorkoutService.createWorkout(workout);
        const response = PostWorkoutResponseMapper.create();
        res.status(201).send(response);
    } catch (error) {
        res.status(500).send(ErrorResponseMapper.create("Failed to create workout"));
    }
});

// PUT /workouts/:id - Edit workout
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        if (!userId) {
            res.status(500).send(ErrorResponseMapper.create("User ID not found in request"));
            return;
        }
        
        let formattedRequest;
        try {
            formattedRequest = PutWorkoutRequestMapper.fromAny(req.body);
        } catch (e) {
            res.status(400).send(ErrorResponseMapper.create("Invalid request shape for workout update"));
            return;
        }
        
        // Create workout entity from DTO
        const workout = new Workout(id, formattedRequest.name, userId);
        workout.exerciseIds = formattedRequest.exerciseIds;
        
        await WorkoutService.updateWorkout(id, workout, userId);
        const response = PutWorkoutResponseMapper.create();
        res.status(200).send(response);
    } catch (error) {
        if (error instanceof Error && error.message === "Workout not found") {
            res.status(404).send(ErrorResponseMapper.create("Workout not found"));
        } else {
            res.status(500).send(ErrorResponseMapper.create("Failed to update workout"));
        }
    }
});

// POST /workouts/:id/:exerciseId - Add existing exercise to workout
router.post("/:id/:exerciseId", async (req, res) => {
    try {
        const { id: workoutId, exerciseId } = req.params;
        const userId = req.userId;
        if (!userId) {
            res.status(500).send(ErrorResponseMapper.create("User ID not found in request"));
            return;
        }
        
        await WorkoutService.addExerciseToWorkout(workoutId, exerciseId, userId);
        res.status(200).send({ message: "Exercise added to workout successfully" });
    } catch (error) {
        if (error instanceof Error && (error.message === "Workout not found or access denied" || error.message === "Exercise not found")) {
            res.status(404).send(ErrorResponseMapper.create(error.message));
        } else {
            res.status(500).send(ErrorResponseMapper.create("Failed to add exercise to workout"));
        }
    }
});

// DELETE /workouts/:id - Delete workout
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        if (!userId) {
            res.status(500).send(ErrorResponseMapper.create("User ID not found in request"));
            return;
        }
        
        await WorkoutService.deleteWorkout(id, userId);
        const response = DeleteWorkoutResponseMapper.create();
        res.status(200).send(response);
    } catch (error) {
        if (error instanceof Error && error.message === "Workout not found") {
            res.status(404).send(ErrorResponseMapper.create("Workout not found"));
        } else {
            res.status(500).send(ErrorResponseMapper.create("Failed to delete workout"));
        }
    }
});

export default router;