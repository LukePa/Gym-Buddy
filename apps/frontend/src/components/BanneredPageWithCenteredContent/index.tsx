import styles from "./styles.module.css"
import {PropsWithChildren} from "react";
import BanneredPage from "../BanneredPage/index.js";

export default function BanneredPageWithCenteredContent({children}: PropsWithChildren) {
    return (
        <BanneredPage>
            <div className={styles.centeredContentContainer}>
                {children}
            </div>
        </BanneredPage>
    )
}