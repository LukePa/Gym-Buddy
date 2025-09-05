import {db} from "../database";
import Exercise from "../entities/exercise";
import ExerciseMapper from "../mappers/exerciseMapper";

export default class ExerciseRepository {
    
    static async createExercise(exercise: Exercise) {
        const dbObject = ExerciseMapper.toDbType();
        await db.insertInto("exercise")
            
    }
    
    static async deleteExercise() {
        
    }
    
    static async updateExercise() {
        
    }
}