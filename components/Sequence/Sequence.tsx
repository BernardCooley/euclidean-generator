import React from "react";
import { Sequence } from "../../types";
import { useSequenceContext } from "../Contexts/SequenceContext";
import Controls from "../Controls/Conteols";
import Step from "../Step/Step";
import styles from "./styles.module.scss";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

interface Props {
    sequence: Sequence;
    seqIndex: number;
}

const Sequence = ({ sequence, seqIndex }: Props) => {
    const { addRemoveStep, addRemoveTrig, half, double, offset } =
        useSequenceContext();
    const [minimised, setMinimised] = React.useState(false);

    return (
        <div
            className={`${styles.sequencerContainer} ${
                minimised ? styles.minimised : ""
            }`}
        >
            <CloseFullscreenIcon
                fontSize="large"
                className={styles.minimiseIcon}
                onClick={() => setMinimised(!minimised)}
            />
            <h2
                className={`${styles.title} ${
                    minimised ? styles.minimised : ""
                }`}
            >
                {sequence.title}
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
                        stepNumber={index + 1}
                        isGridStep={index % 4 === 0}
                        minimised={minimised}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sequence;