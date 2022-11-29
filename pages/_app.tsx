import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SequenceContextProvider } from "../components/Contexts/SequenceContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SequenceContextProvider>
            <Component {...pageProps} />
        </SequenceContextProvider>
    );
}
