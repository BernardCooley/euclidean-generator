import React from "react";
import styles from "./styles.module.scss";

interface Props {
    active: boolean;
    stepNumber: number;
    isGridStep?: boolean;
}

const Step = ({ active, stepNumber, isGridStep }: Props) => {
    return (
        <div className={`${styles.container}`}>
            <div className={styles.stepNumberContainer}>
                <div
                    className={`${styles.stepNumber} ${
                        active ? styles.active : ""
                    } ${isGridStep ? styles.gridStep : ""}`}
                >
                    {stepNumber}
                </div>
            </div>
        </div>
    );
};

export default Step;
