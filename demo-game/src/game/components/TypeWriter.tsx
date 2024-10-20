import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";

const Text = styled(Typography)({
    fontWeight: "bold",
    textDecoration: "underline ",
    maxWidth: "250px",
});

interface TypeWriterProps {
    content: string;
    style?: CSSProperties;
}

const TypeWriter = (props: TypeWriterProps) => {
    const { content, style } = props;
    const [text, setText] = useState<string>("");
    const [fullText, _setFullText] = useState<string>(content);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const typingEffect = setInterval(() => {
            if (currentIndex < fullText.length) {
                setText((prevText) => prevText + fullText[currentIndex]);
                setCurrentIndex(currentIndex + 1);
            } else {
                clearInterval(typingEffect); // Stop the typewriter effect when the text is fully typed
            }
        }, 50);

        return () => {
            clearInterval(typingEffect); // Clean up the interval when the component unmounts
        };
    }, [currentIndex, fullText]);

    return <Text style={{ ...style }}>{text}</Text>;
};

export default TypeWriter;
