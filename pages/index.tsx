import { AddSequenceForm } from "../components/AddSequence/AddSequence";
import { useSequenceContext } from "../components/Contexts/SequenceContext";
import styles from "../styles/Home.module.scss";
import Sequence from "../components/Sequence/Sequence";
import AddButton from "../components/AddButton/AddButton";

const Home = () => {
    const { sequences, formOpen } = useSequenceContext();

    return (
        <div className={styles.container}>
            <h1
                className={`${styles.appTitle} ${
                    sequences.length > 0 ? styles.sequences : ""
                }`}
            >
                Euclidean sequence generator
            </h1>
            <AddButton />
            {formOpen && <AddSequenceForm />}

            {sequences?.map((seq, i) => (
                <Sequence
                    key={JSON.stringify(seq)}
                    sequence={seq}
                    seqIndex={i}
                />
            ))}
        </div>
    );
};

export default Home;
