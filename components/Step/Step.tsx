import React from "react";
import styles from "./styles.module.scss";

interface Props {
    active: boolean;
    stepNumber: number;
    isGridStep?: boolean;
    minimised?: boolean;
}

const Step = ({ active, stepNumber, isGridStep, minimised }: Props) => {
    return (
        <div
            className={`${styles.container} ${
                minimised ? styles.minimised : ""
            } ${minimised && active ? styles.active : ""}`}
        >
            {!minimised && (
                <div className={styles.stepNumberContainer}>
                    <div
                        className={`${styles.stepNumber} ${
                            active ? styles.active : ""
                        } ${isGridStep ? styles.gridStep : ""}`}
                    >
                        {stepNumber}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step;
