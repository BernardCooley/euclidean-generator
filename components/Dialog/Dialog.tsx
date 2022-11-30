import React, { useState, useEffect } from "react";
import Step from "../Step/Step";
import styles from "./styles.module.scss";

const buttonStyles = {
    width: "200px",
    aspectRatio: "unset",
    height: "64px",
    cursor: "pointer",
};

interface Props {
    text: string;
    confirmOnClick: () => void;
    cancelOnClick: () => void;
}

const Dialog = ({ text, confirmOnClick, cancelOnClick }: Props) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.text}>{text}</h2>
            <div className={styles.buttonContainer}>
                <div onClick={cancelOnClick}>
                    <Step
                        isButton={true}
                        active={false}
                        stepText="Cancel"
                        isGridStep={true}
                        isMinimised={false}
                        additionalStyles={buttonStyles}
                    />
                </div>
                <div onClick={confirmOnClick}>
                    <Step
                        isButton={true}
                        active={false}
                        stepText="Confirm"
                        isGridStep={true}
                        isMinimised={false}
                        additionalStyles={buttonStyles}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dialog;
