import { AddSequenceForm } from "../components/AddSequence/AddSequence";
import { useSequenceContext } from "../components/Contexts/SequenceContext";
import Step from "../components/Step/Step";
import styles from "../styles/Home.module.scss";
import AddIcon from "@mui/icons-material/Add";
import Controls from "../components/Controls/Conteols";

export default function Home() {
    const { sequences, formOpen, openCloseForm, addRemoveStep, addRemoveTrig } =
        useSequenceContext();

    return (
        <div className={styles.container}>
            <div
                className={styles.addIcon}
                onClick={() => openCloseForm("open")}
            >
                <AddIcon />
            </div>
            {formOpen && <AddSequenceForm />}

            {sequences?.map((seq, i) => (
                <div
                    key={JSON.stringify(seq)}
                    className={styles.sequencerContainer}
                >
                    <h2 className={styles.title}>{seq.title}</h2>
                    <div className={styles.details}>
                        <Controls
                            currentNumber={seq.sequence.length}
                            title="Steps"
                            addOnClick={() => addRemoveStep(i, "add")}
                            removeOnClick={() => addRemoveStep(i, "remove")}
                        />
                        <Controls
                            currentNumber={seq.sequence.filter((s) => s).length}
                            title="Trigs"
                            addOnClick={() => addRemoveTrig(i, "add")}
                            removeOnClick={() => addRemoveTrig(i, "remove")}
                        />
                    </div>
                    <div className={styles.sequencer}>
                        {seq?.sequence.map((step, index) => (
                            <Step
                                key={index}
                                active={step}
                                stepNumber={index + 1}
                                isGridStep={index % 4 === 0}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
