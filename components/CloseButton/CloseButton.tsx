import React from "react";
import styles from "./styles.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useSequenceContext } from "../Contexts/SequenceContext";

interface Props {}

const CloseButton = ({}: Props) => {
    const { openCloseForm } = useSequenceContext();

    return (
        <div
            className={styles.closeIcon}
            onClick={() => openCloseForm("close")}
        >
            <CloseIcon />
        </div>
    );
};

export default CloseButton;
