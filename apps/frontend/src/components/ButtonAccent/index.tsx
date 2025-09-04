import type {PropsWithChildren} from "react";
import styles from "./styles.module.css";

type Props = {
    onClick: (() => void) | (() => Promise<void>);
}

export default function ButtonAccent({children, onClick}: PropsWithChildren<Props>) {
    return (
        <button className={styles.accentButton} onClick={onClick}>
            {children}
        </button>
    )
}