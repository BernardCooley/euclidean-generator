import React from "react";
import styles from "./styles.module.scss";

interface Props {
    active: boolean;
    stepText: number | string;
    isGridStep?: boolean;
    isMinimised?: boolean;
    additionalStyles?: {
        [key: string]: string;
    };
    isButton?: boolean;
}

const Step = ({
    active,
    stepText,
    isGridStep,
    isMinimised,
    additionalStyles,
    isButton,
}: Props) => {
    return (
        <div
            className={`${styles.container} ${
                isMinimised ? styles.isMinimised : ""
            } ${isMinimised && active ? styles.active : ""} ${
                isButton ? styles.isButton : ""
            }`}
            style={additionalStyles}
        >
            {!isMinimised && (
                <div className={styles.stepNumberContainer}>
                    <div
                        className={`${styles.stepText} ${
                            active ? styles.active : ""
                        } ${isGridStep ? styles.gridStep : ""}`}
                    >
                        {stepText}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step;
