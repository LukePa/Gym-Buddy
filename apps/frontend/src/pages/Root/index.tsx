import performAuthenticatedRequest from "../../requests/performAuthenticatedRequest.ts";
import {getApiUrl} from "../../helpers/envHelpers.ts";
import BanneredPage from "../../components/BanneredPage/index.tsx";
import styles from "./styles.module.css";
import LetsWorkoutButton from "../../components/LetsWorkoutButton/index.js";
import Button from "../../components/Button/index.js";
import {useNavigate} from "react-router";


export default function Root() {
    const navigate = useNavigate();
    
    const onLetsWorkoutClick = () => {
        alert("TODO")
    }
    
    const onExercisesClick = () => {
        navigate("exercises")
    }
    
    const onWorkoutsClick = () => {
        navigate("workouts")
    }


    return (
        <BanneredPage>
            <div className={styles.page}>
                <div className={styles.buttonsContainer}>
                    <div className={styles.startWorkoutButtonWrapper}>
                        <LetsWorkoutButton onClick={onLetsWorkoutClick} />
                    </div>
                    <Button onClick={onWorkoutsClick}>Workouts</Button>
                    <Button onClick={onExercisesClick}>Exercises</Button>
                </div>
            </div>
        </BanneredPage>
    )
}