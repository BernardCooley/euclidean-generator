import React, { createContext, ReactNode, useContext, useState } from "react";
import { SequenceGenerator } from "../sequenceGenerator";

interface Sequence {
    title: string;
    sequence: boolean[];
    offset: number;
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
    offset: (sequenceIndex: number, offset: number) => void;
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
    offset: () => {},
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
            offset: 0,
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

        transformSequence(sequences, newSequence);
    };

    const addRemoveTrig = (sequenceIndex: number, addRemove: string) => {
        const newSequence = SequenceGenerator({
            trigs:
                addRemove === "add"
                    ? getSeqLengths(sequenceIndex).trigs + 1
                    : getSeqLengths(sequenceIndex).trigs - 1,
            steps: getSeqLengths(sequenceIndex).steps,
        });

        transformSequence(sequences, newSequence);
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

        transformSequence(sequences, newSequence);
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

        transformSequence(sequences, newSequence);
    };

    const offset = (sequenceIndex: number, offset: number) => {
        const newSequences = [...sequences];
        newSequences[sequenceIndex].offset =
            newSequences[sequenceIndex].offset + offset;
        console.log(
            "🚀 ~ file: SequenceContext.tsx ~ line 130 ~ offset ~ newSequences[sequenceIndex].offset",
            newSequences[sequenceIndex].offset
        );
        setSequences(positionTrigs(newSequences, offset));
    };

    const transformSequence = (oldSeqs: Sequence[], newSeq: number[]) => {
        const n = [...oldSeqs];
        n[0].sequence = newSeq as unknown as boolean[];
        setSequences(n);
    };

    const positionTrigs = (
        seqs: Sequence[],
        offsetSent: number | null = null
    ): Sequence[] => {
        return seqs.map((seq) => {
            if (offsetSent) {
                if (offsetSent === 1) {
                    seq.sequence.unshift(seq.sequence.pop() as boolean);
                } else {
                    seq.sequence.push(seq.sequence.shift() as boolean);
                }
            }

            return seq;
        });
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
                offset,
            }}
        >
            {children}
        </SequenceContext.Provider>
    );
};
