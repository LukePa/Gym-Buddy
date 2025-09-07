import {Router} from "express";
import {authenticate} from "../../middleware/authenticate";
import ExerciseService from "../../services/exerciseService";
import WorkoutService from "../../services/workoutService";
import ExerciseMapper from "../../mappers/exerciseMapper";
import Exercise from "../../entities/exercise";
import MetricMapper from "../../mappers/metricMapper";
import {ErrorResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/errorResponse";
import ExerciseWithoutIdMapper from "@gym-buddy/requestresponsetypes/mappers/entities/ExerciseWithoutIdMapper";
import { randomUUID } from "node:crypto";
import {
    GetExercisesRequestMapper,
    GetExercisesResponseMapper
} from "@gym-buddy/requestresponsetypes/mappers/routes/exercises/GetExercises";
import {
    GetExerciseRequestMapper,
    GetExerciseResponseMapper
} from "@gym-buddy/requestresponsetypes/mappers/routes/exercises/GetExercise";
import {
    PostExerciseRequestMapper,
    PostExerciseResponseMapper
} from "@gym-buddy/requestresponsetypes/mappers/routes/exercises/PostExercise";
import {
    PutExerciseRequestMapper,
    PutExerciseResponseMapper
} from "@gym-buddy/requestresponsetypes/mappers/routes/exercises/PutExercise";
import {
    DeleteExerciseRequestMapper,
    DeleteExerciseResponseMapper
} from "@gym-buddy/requestresponsetypes/mappers/routes/exercises/DeleteExercise";

const router = Router();

router.use(authenticate);

// GET /exercises - Get all exercises
router.get("/", async (req, res) => {
    try {
        const exercises = await ExerciseService.getAllExercises();
        const response = GetExercisesResponseMapper.create(
            exercises.map(exercise => ExerciseMapper.toDtoType(exercise))
        );
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(ErrorResponseMapper.create("Failed to fetch exercises"));
    }
});

// GET /exercises/:id - Get specific exercise
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const exercise = await ExerciseService.getExerciseById(id);
        
        if (!exercise) {
            res.status(404).send(ErrorResponseMapper.create("Exercise not found"));
            return;
        }
        
        const response = GetExerciseResponseMapper.create(
            exercise.id,
            exercise.name,
            exercise.metrics
        );
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(ErrorResponseMapper.create("Failed to fetch exercise"));
    }
});

// POST /exercises - Create new exercise
router.post("/", async (req, res) => {
    try {
        let formattedRequest;
        try {
            formattedRequest = PostExerciseRequestMapper.fromAny(req.body);
        } catch (e) {
            res.status(400).send(ErrorResponseMapper.create("Invalid request shape for exercise creation"));
            return;
        }
        
        const userId = req.userId;
        if (!userId) {
            res.status(500).send(ErrorResponseMapper.create("User ID not found in request"));
            return;
        }
        
        // Generate ID and create exercise entity
        const id = randomUUID();
        const exercise = new Exercise(id, formattedRequest.name);
        
        // Map metrics from DTOs to entities
        if (formattedRequest.metrics && formattedRequest.metrics.length > 0) {
            exercise.metrics = formattedRequest.metrics.map(metricDto => 
                MetricMapper.fromDtoType(metricDto, id)
            );
        }
        
        const exerciseId = await ExerciseService.createExercise(exercise);
        
        // If workoutId is provided, add exercise to workout
        if (formattedRequest.workoutId) {
            try {
                await WorkoutService.addExerciseToWorkout(formattedRequest.workoutId, exerciseId, userId);
            } catch (error) {
                // If adding to workout fails, return error response
                if (error instanceof Error && error.message === "Workout not found") {
                    res.status(404).send(ErrorResponseMapper.create("Workout not found"));
                    return;
                } else {
                    res.status(500).send(ErrorResponseMapper.create("Failed to add exercise to workout"));
                    return;
                }
            }
        }
        
        const response = PostExerciseResponseMapper.create();
        res.status(201).send(response);
    } catch (error) {
        res.status(500).send(ErrorResponseMapper.create("Failed to create exercise"));
    }
});

// PUT /exercises/:id - Edit exercise
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
            formattedRequest = PutExerciseRequestMapper.fromAny(req.body);
        } catch (e) {
            res.status(400).send(ErrorResponseMapper.create("Invalid request shape for exercise update"));
            return;
        }
        
        // Create exercise entity from DTO
        const exercise = new Exercise(id, formattedRequest.name);
        
        // Map metrics from DTOs to entities
        if (formattedRequest.metrics && formattedRequest.metrics.length > 0) {
            exercise.metrics = formattedRequest.metrics.map(metricDto => 
                MetricMapper.fromDtoType(metricDto, id)
            );
        }
        
        await ExerciseService.updateExercise(id, exercise);
        
        // If workoutId is provided, add exercise to workout
        if (formattedRequest.workoutId) {
            try {
                await WorkoutService.addExerciseToWorkout(formattedRequest.workoutId, id, userId);
            } catch (error) {
                // If adding to workout fails, return error response
                if (error instanceof Error && error.message === "Workout not found") {
                    res.status(404).send(ErrorResponseMapper.create("Workout not found"));
                    return;
                } else {
                    res.status(500).send(ErrorResponseMapper.create("Failed to add exercise to workout"));
                    return;
                }
            }
        }
        
        const response = PutExerciseResponseMapper.create();
        res.status(200).send(response);
    } catch (error) {
        if (error instanceof Error && error.message === "Exercise not found") {
            res.status(404).send(ErrorResponseMapper.create("Exercise not found"));
        } else {
            res.status(500).send(ErrorResponseMapper.create("Failed to update exercise"));
        }
    }
});

// DELETE /exercises/:id - Delete exercise
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        await ExerciseService.deleteExercise(id);
        const response = DeleteExerciseResponseMapper.create();
        res.status(200).send(response);
    } catch (error) {
        if (error instanceof Error && error.message === "Exercise not found") {
            res.status(404).send(ErrorResponseMapper.create("Exercise not found"));
        } else {
            res.status(500).send(ErrorResponseMapper.create("Failed to delete exercise"));
        }
    }
});

export default router;