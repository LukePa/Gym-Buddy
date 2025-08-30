import type {PropsWithChildren} from "react";
import styles from "./styles.module.css";

export default function Page({children}: PropsWithChildren) {
    return (
        <div className={styles.pageContainer}>
            {children}
        </div>
    )
}