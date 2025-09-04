import styles from "./styles.module.css"

export default function LoadingScreen() {
    return (
        <div className={styles.container}>
            <span className={styles.text}>Loading...</span>
        </div>
    )
}