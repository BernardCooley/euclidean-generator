import React, { createContext, ReactNode, useContext, useState } from "react";
import { SequenceGenerator } from "../sequenceGenerator";

interface Sequence {
    title: string;
    sequence: boolean[];
}

interface SequenceContextProps {
    sequences: Sequence[];
    addSequence: (title: string, trigs: number, steps: number) => void;
    formOpen: boolean;
    openCloseForm: (openClose: "open" | "close") => void;
    addRemoveStep: (sequenceIndex: number, addRemove: string) => void;
    addRemoveTrig: (sequenceIndex: number, addRemove: string) => void;
    half: (sequenceIndex: number, type: "trigs" | "steps") => void;
    double: (sequenceIndex: number, type: "trigs" | "steps") => void;
}

export const SequenceContext = createContext<SequenceContextProps>({
    sequences: [],
    addSequence: () => {},
    formOpen: false,
    openCloseForm: () => {},
    addRemoveStep: () => {},
    addRemoveTrig: () => {},
    half: () => {},
    double: () => {},
});

export const useSequenceContext = () => useContext(SequenceContext);

export const SequenceContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [sequences, setSequences] = useState<Sequence[]>([]);
    const [formOpen, setFormOpen] = useState<boolean>(false);

    const addSequence = (title: string, trigs: number, steps: number) => {
        const seq: Sequence = {
            title,
            sequence: SequenceGenerator({
                trigs: trigs,
                steps: steps,
            }) as unknown as boolean[],
        };

        setSequences((sequences) => [...sequences, seq]);
    };

    const openCloseForm = (openClose: string) => {
        setFormOpen(openClose === "open" ? true : false);
    };

    const getSeqLengths = (sequenceIndex: number) => {
        return {
            steps: sequences[sequenceIndex].sequence.length,
            trigs: sequences[sequenceIndex].sequence.filter((step) => step)
                .length,
        };
    };

    const addRemoveStep = (sequenceIndex: number, addRemove: string) => {
        const newSequence = SequenceGenerator({
            trigs: getSeqLengths(sequenceIndex).trigs,
            steps:
                addRemove === "add"
                    ? getSeqLengths(sequenceIndex).steps + 1
                    : getSeqLengths(sequenceIndex).steps - 1,
        });

        const n: Sequence[] = [...sequences];
        n[sequenceIndex].sequence = newSequence as unknown as boolean[];
        setSequences(n);
    };

    const addRemoveTrig = (sequenceIndex: number, addRemove: string) => {
        const newSequence = SequenceGenerator({
            trigs:
                addRemove === "add"
                    ? getSeqLengths(sequenceIndex).trigs + 1
                    : getSeqLengths(sequenceIndex).trigs - 1,
            steps: getSeqLengths(sequenceIndex).steps,
        });

        const n = [...sequences];
        n[sequenceIndex].sequence = newSequence as unknown as boolean[];
        setSequences(n);
    };

    const half = (sequenceIndex: number, type: "trigs" | "steps") => {
        const newSequence = SequenceGenerator({
            trigs:
                type === "trigs"
                    ? Math.floor(getSeqLengths(sequenceIndex).trigs / 2)
                    : getSeqLengths(sequenceIndex).trigs,
            steps:
                type === "steps"
                    ? Math.floor(getSeqLengths(sequenceIndex).steps / 2)
                    : getSeqLengths(sequenceIndex).steps,
        });

        const n = [...sequences];
        n[sequenceIndex].sequence = newSequence as unknown as boolean[];
        setSequences(n);
    };

    const double = (sequenceIndex: number, type: "trigs" | "steps") => {
        const newSequence = SequenceGenerator({
            trigs:
                type === "trigs"
                    ? getSeqLengths(sequenceIndex).trigs * 2
                    : getSeqLengths(sequenceIndex).trigs,
            steps:
                type === "steps"
                    ? getSeqLengths(sequenceIndex).steps * 2
                    : getSeqLengths(sequenceIndex).steps,
        });

        const n = [...sequences];
        n[sequenceIndex].sequence = newSequence as unknown as boolean[];
        setSequences(n);
    };

    return (
        <SequenceContext.Provider
            value={{
                sequences,
                addSequence,
                formOpen,
                openCloseForm,
                addRemoveStep,
                addRemoveTrig,
                half,
                double,
            }}
        >
            {children}
        </SequenceContext.Provider>
    );
};
