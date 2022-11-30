import React, { useState, useEffect } from "react";
import Step from "../Step/Step";
import styles from "./styles.module.scss";

interface Props {
    text: string;
    confirmOnClick: () => void;
    cancelOnClick: () => void;
}

const ConfirmDialog = ({ text, confirmOnClick, cancelOnClick }: Props) => {
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
                        minimised={false}
                        additionalStyles={{
                            width: "200px",
                            aspectRatio: "unset",
                            height: "50px",
                            cursor: "pointer",
                        }}
                    />
                </div>
                <div onClick={confirmOnClick}>
                    <Step
                        isButton={true}
                        active={false}
                        stepText="Confirm"
                        isGridStep={true}
                        minimised={false}
                        additionalStyles={{
                            width: "200px",
                            aspectRatio: "unset",
                            height: "50px",
                            cursor: "pointer",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
