import ButtonAccent from "../ButtonAccent/index.js";
import styles from "./styles.module.css";


type Props = {
    onClick: () => void    
}

export default function LetsWorkoutButton({onClick}: Props) {
    return (
        <ButtonAccent onClick={onClick}>
            <span className={styles.buttonText}>Start a Workout!</span>
        </ButtonAccent>
    )
    
}