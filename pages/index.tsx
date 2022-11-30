import { AddSequenceForm } from "../components/AddSequence/AddSequence";
import { useSequenceContext } from "../components/Contexts/SequenceContext";
import styles from "../styles/Home.module.scss";
import AddIcon from "@mui/icons-material/Add";
import Sequence from "../components/Sequence/Sequence";

const Home = () => {
    const { sequences, formOpen, openCloseForm } = useSequenceContext();

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
