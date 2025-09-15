import IRepository from "../models/IRepository.js";
import Exercise from "../entities/exercise.js";
import Workout from "../entities/workouts.js";
import Metric from "../entities/metric.js";


export class GlobalDataManager {
    private repository: IRepository
    
    private _exercises?: Array<Exercise>
    private _workouts?: Array<Workout>
    
    isInitialised: boolean = false;
    
    constructor(repository: IRepository) {
        this.repository = repository;
    }
    
    async intialise() {
        const [exercises, workouts] = await Promise.all([
            this.repository.getAllExercises(), 
            this.repository.getAllWorkouts()
        ])
        
        this._exercises = exercises;
        this._workouts = workouts;
        
        this.isInitialised = true;
    }
    
    clear() {
        this._exercises = undefined;
        this._workouts = undefined;
    }
    
    get exercises() {
        if (!this._exercises) throw new Error("get Exercises called without being intialised");
        return [...this._exercises];
    }   
    
    get workouts() {
        if (!this._workouts) throw new Error("get Workouts called without being initialised");
        return [...this._workouts];
    }
    
    async updateExercise(exerciseToUpdate: Exercise, workoutId?: string) {
        if (!this._exercises) this._exercises = [exerciseToUpdate];
        
        await this.repository.updateExercise(exerciseToUpdate);
        
        if (!this._exercises.includes(exerciseToUpdate)) {
            const matchingExerciseIndex = this._exercises.findIndex((ex) => {
                return ex.id === exerciseToUpdate.id;
            })
            
            if (matchingExerciseIndex > -1) {
                this._exercises[matchingExerciseIndex] = exerciseToUpdate;
            } else {
                this._exercises.push(exerciseToUpdate);
            }
        }
        
        if (workoutId && this._workouts) {
            const matchingWorkout = this._workouts.find(w => {
                return w.id === workoutId;
            })
            
            if (matchingWorkout && !matchingWorkout.exercises.includes(exerciseToUpdate.id)) {
                matchingWorkout.exercises.push(exerciseToUpdate.id);
            }
        }
    }
    
    async updateWorkout(workoutToUpdate: Workout) {
        if (!this._workouts) this._workouts = [workoutToUpdate];
        
        await this.repository.updateWorkout(workoutToUpdate);
        
        if (!this._workouts.includes(workoutToUpdate)) {
            const matchingIndex = this._workouts.findIndex(workout => {
                return workout.id === workoutToUpdate.id; 
            })
            
            if (matchingIndex > -1) {
                this._workouts[matchingIndex] = workoutToUpdate;
            } else {
                this._workouts.push(workoutToUpdate);
            }
        }
    }
    
    async deleteExercise(exerciseID: string) {
        await this.repository.deleteExercise(exerciseID);
        this._exercises?.filter(exercise => {
            return exercise.id !== exerciseID;
        })
        
        this._workouts?.forEach(workout => {
            workout.exercises = workout.exercises.filter(id => {
                return id !== exerciseID;
            })
        })
    }
    
    async deleteWorkout(workoutId: string) {
        await this.repository.deleteWorkout(workoutId);
        this._workouts?.filter(workout => {
            return workout.id !== workoutId;
        })
    }
    
    async createExercise(name: string, metrics: Array<Metric>, workoutId?: string) {
        const exercise = await this.repository.createExercise(name, metrics);
        if (!this._exercises) this._exercises = [];
        this._exercises.push(exercise);

        if (workoutId && this._workouts) {
            const matchingWorkout = this._workouts.find(w => {
                return w.id === workoutId;
            })

            if (matchingWorkout && !matchingWorkout.exercises.includes(exercise.id)) {
                matchingWorkout.exercises.push(exercise.id);
            }
        }
    }
    
    async createWorkout(name: string, exerciseIDs: Array<string>) {
        const workout = await this.repository.createWorkout(name, exerciseIDs);
        if (!this._workouts) this._workouts = []
        this._workouts.push(workout)
    }
}