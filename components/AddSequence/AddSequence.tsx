import React, { useState, useEffect } from "react";
import { useSequenceContext } from "../Contexts/SequenceContext";
import styles from "./styles.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import CloseButton from "../CloseButton/CloseButton";

interface Props {}

export const AddSequenceForm = ({}: Props) => {
    const { addSequence, openCloseForm, sequences } = useSequenceContext();
    const [trigs, setTrigs] = useState<number>(4);
    const [steps, setSteps] = useState<number>(16);
    const [title, setTitle] = useState<string>(
        `Sequence ${sequences.length + 1}`
    );

    useEffect(() => {}, []);

    const generateSequence = (e: any) => {
        e.preventDefault();
        addSequence(title, trigs, steps);
        openCloseForm("close");
    };

    return (
        <div className={styles.container}>
            <div className={styles.closeContainer}>
                <CloseButton />
            </div>
            <form className={styles.form} onSubmit={generateSequence}>
                <div className={styles.fields}>
                    <label className={styles.label}>
                        Title
                        <input
                            className={styles.input}
                            onChange={(event) => setTitle(event.target.value)}
                            type="text"
                            value={title}
                        />
                    </label>
                    <div className={styles.stepsInputs}>
                        <label className={styles.label}>
                            On steps
                            <input
                                className={styles.input}
                                onChange={(event) =>
                                    setTrigs(Number(event.target.value))
                                }
                                type="number"
                                value={trigs}
                            />
                        </label>
                        <label className={styles.label}>
                            Total steps
                            <input
                                className={styles.input}
                                onChange={(event) =>
                                    setSteps(Number(event.target.value))
                                }
                                type="number"
                                value={steps}
                            />
                        </label>
                    </div>
                </div>
                <button
                    className={styles.generateButton}
                    disabled={trigs === 0 || steps === 0}
                >
                    Generate
                </button>
            </form>
        </div>
    );
};
