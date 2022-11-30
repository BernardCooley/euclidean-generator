import React from "react";
import styles from "./styles.module.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface Props {
    currentNumber: number;
    title: string;
    addOnClick: () => void;
    removeOnClick: () => void;
    halfOnClick: () => void;
    doubleOnClick: () => void;
    children?: React.ReactNode;
}

const Controls = ({
    currentNumber,
    title,
    addOnClick,
    removeOnClick,
    halfOnClick,
    doubleOnClick,
    children,
}: Props) => {
    return (
        <div className={styles.controls}>
            <div className={styles.controlsTitle}>
                {title}: {currentNumber}
            </div>
            <div className={styles.icons}>
                <RemoveIcon fontSize="large" onClick={removeOnClick} />
                <AddIcon fontSize="large" onClick={addOnClick} />
                <div className={styles.half} onClick={halfOnClick}>
                    1/2
                </div>
                <div className={styles.double} onClick={doubleOnClick}>
                    X2
                </div>
                {children}
            </div>
        </div>
    );
};

export default Controls;
