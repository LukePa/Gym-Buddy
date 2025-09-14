import IRepository from "../models/IRepository.js";
import Exercise from "../entities/exercise.js";
import Workout from "../entities/workouts.js";


export class GlobalDataManager {
    private repository: IRepository
    
    private exercises?: Array<Exercise>
    private workouts?: Array<Workout>
    
    isInitialised: boolean = false;
    
    constructor(repository: IRepository) {
        this.repository = repository;
    }
    
    async intialise() {
        //Do stuff
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 5000)
        })
        
        await promise;
        this.isInitialised = true;
    }
    
    clear() {
        this.exercises = undefined;
        this.workouts = undefined;
    }
}