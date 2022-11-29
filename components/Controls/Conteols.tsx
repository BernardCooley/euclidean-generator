import React from "react";
import styles from "./styles.module.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface Props {
    currentNumber: number;
    title: string;
    addOnClick: () => void;
    removeOnClick: () => void;
}

const Controls = ({
    currentNumber,
    title,
    addOnClick,
    removeOnClick,
}: Props) => {
    return (
        <div className={styles.controls}>
            <div className={styles.controlsTitle}>
                {title}: {currentNumber}
            </div>
            <div className={styles.icons}>
                <AddIcon fontSize="large" onClick={addOnClick} />
                <RemoveIcon fontSize="large" onClick={removeOnClick} />
            </div>
        </div>
    );
};

export default Controls;
