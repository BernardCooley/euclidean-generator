import React from "react";
import { Sequence } from "../../types";
import { useSequenceContext } from "../Contexts/SequenceContext";
import Controls from "../Controls/Controls";
import Step from "../Step/Step";
import styles from "./styles.module.scss";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseIcon from "@mui/icons-material/Close";
import CloseButton from "../CloseButton/CloseButton";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

interface Props {
    sequence: Sequence;
    seqIndex: number;
}

const Sequence = ({ sequence, seqIndex }: Props) => {
    const {
        addRemoveStep,
        addRemoveTrig,
        half,
        double,
        offset,
        removeSequence,
    } = useSequenceContext();
    const [minimised, setMinimised] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const getStepNumber = (step: number): number => {
        if (step > 15 && step < 32) {
            return step - 16;
        }
        if (step > 31 && step < 48) {
            return step - 32;
        }
        if (step > 47 && step < 64) {
            return step - 48;
        }
        if (step > 63 && step < 80) {
            return step - 64;
        }
        return step;
    };

    return (
        <div
            className={`${styles.sequencerContainer} ${
                minimised ? styles.minimised : ""
            }`}
        >
            {dialogOpen && (
                <ConfirmDialog
                    text={`Do you want to remove ${sequence.title}`}
                    cancelOnClick={() => setDialogOpen(false)}
                    confirmOnClick={() => removeSequence(seqIndex)}
                />
            )}
            <div
                className={styles.closeContainer}
                onClick={() => setDialogOpen(true)}
            >
                <CloseButton />
            </div>
            {minimised ? (
                <OpenInFullIcon
                    fontSize="large"
                    className={styles.minimiseIcon}
                    onClick={() => setMinimised(!minimised)}
                />
            ) : (
                <CloseFullscreenIcon
                    fontSize="large"
                    className={styles.minimiseIcon}
                    onClick={() => setMinimised(!minimised)}
                />
            )}
            <h2
                className={`${styles.title} ${
                    minimised ? styles.minimised : ""
                }`}
            >
                <div>{sequence.title}</div>
            </h2>
            <div
                className={`${styles.details} ${
                    minimised ? styles.hidden : ""
                }`}
            >
                <Controls
                    currentNumber={sequence.sequence.length}
                    title="Steps"
                    addOnClick={() => addRemoveStep(seqIndex, "add")}
                    removeOnClick={() => addRemoveStep(seqIndex, "remove")}
                    halfOnClick={() => half(seqIndex, "steps")}
                    doubleOnClick={() => double(seqIndex, "steps")}
                />
                <Controls
                    currentNumber={sequence.sequence.filter((s) => s).length}
                    title="Trigs"
                    addOnClick={() => addRemoveTrig(seqIndex, "add")}
                    removeOnClick={() => addRemoveTrig(seqIndex, "remove")}
                    halfOnClick={() => half(seqIndex, "trigs")}
                    doubleOnClick={() => double(seqIndex, "trigs")}
                >
                    <FastRewindIcon
                        fontSize="large"
                        onClick={() => offset(seqIndex, -1)}
                    />
                    <FastForwardIcon
                        fontSize="large"
                        onClick={() => offset(seqIndex, 1)}
                    />
                </Controls>
            </div>
            <div className={styles.sequencer}>
                {sequence?.sequence.map((step, index) => (
                    <Step
                        key={index}
                        active={step}
                        stepText={getStepNumber(index) + 1}
                        isGridStep={index % 4 === 0}
                        minimised={minimised}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sequence;
