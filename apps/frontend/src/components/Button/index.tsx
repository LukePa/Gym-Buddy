import type {PropsWithChildren} from "react";
import styles from "./styles.module.css";


type Props = {
    onClick: (() => void) | (() => Promise<void>);
}

export default function Button({children, onClick}: PropsWithChildren<Props>) {
    return (
        <button className={styles.buttonContainer} onClick={onClick}>
            {children}
        </button>
    )
}