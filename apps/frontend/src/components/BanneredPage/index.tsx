import type {PropsWithChildren} from "react";
import Page from "../Page/index.tsx";
import styles from "./styles.module.css";


export default function BanneredPage({children}: PropsWithChildren) {
    return (
        <Page>
            <div className={styles.banner}>
                <span className={styles.title}>Gym Buddy</span>
            </div>
            
            {children}
        </Page>
    )
}