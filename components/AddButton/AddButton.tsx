import React from "react";
import styles from "./styles.module.scss";
import AddIcon from "@mui/icons-material/Add";
import { useSequenceContext } from "../Contexts/SequenceContext";

const AddButton = () => {
    const { openCloseForm } = useSequenceContext();

    return (
        <div className={styles.addIcon} onClick={() => openCloseForm("open")}>
            <AddIcon />
        </div>
    );
};

export default AddButton;
