import React from "react";
import styles from "./styles.module.scss";

interface Props {
    active: boolean;
    stepText: number | string;
    isGridStep?: boolean;
    minimised?: boolean;
    additionalStyles?: {
        [key: string]: string;
    };
    isButton?: boolean;
}

const Step = ({
    active,
    stepText,
    isGridStep,
    minimised,
    additionalStyles,
    isButton,
}: Props) => {
    return (
        <div
            className={`${styles.container} ${
                minimised ? styles.minimised : ""
            } ${minimised && active ? styles.active : ""} ${
                isButton ? styles.isButton : ""
            }`}
            style={additionalStyles}
        >
            {!minimised && (
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
