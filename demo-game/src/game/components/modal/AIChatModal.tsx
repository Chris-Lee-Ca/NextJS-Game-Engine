"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, LinearProgress, Typography, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/game/redux/hooks";
import { WEB_LLM_PLUGIN_ID, AI_CHAT_SLICE_ID } from "game-engine/extensions/plugins/webLLMPlugin";
import { addUserMessage, setPendingUserMessage } from "game-engine/extensions/plugins/webLLMPlugin";
import { CUSTOM_STYLE } from "@/game/lib/conts";

const ChatContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "8px",
});

const MessageList = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    maxHeight: "280px",
    overflowY: "auto",
    padding: "4px",
});

const MessageBubble = styled(Box)<{ role: "user" | "assistant" }>(({ role }) => ({
    alignSelf: role === "user" ? "flex-end" : "flex-start",
    backgroundColor: role === "user" ? CUSTOM_STYLE.COLOR.MAIN_TEXT_BACKGROUND_COLOR : CUSTOM_STYLE.COLOR.SECONDARY_PAPER_COLOR,
    color: role === "user" ? CUSTOM_STYLE.COLOR.MAIN_WHITE : CUSTOM_STYLE.COLOR.MAIN_BLACK,
    borderRadius: "12px",
    padding: "8px 12px",
    maxWidth: "80%",
    wordBreak: "break-word",
    fontSize: "14px",
    lineHeight: "1.4",
}));

const InputRow = styled(Box)({
    display: "flex",
    gap: "8px",
    marginTop: "8px",
});

const Input = styled("input")({
    flex: 1,
    padding: "8px 12px",
    borderRadius: "8px",
    border: `2px solid ${CUSTOM_STYLE.COLOR.MAIN_BLACK}`,
    backgroundColor: CUSTOM_STYLE.COLOR.SECONDARY_PAPER_COLOR,
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
});

const SendButton = styled("button")({
    padding: "8px 16px",
    borderRadius: "8px",
    border: `2px solid ${CUSTOM_STYLE.COLOR.MAIN_BLACK}`,
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_BLACK,
    color: CUSTOM_STYLE.COLOR.MAIN_WHITE,
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
    "&:disabled": {
        opacity: 0.5,
        cursor: "not-allowed",
    },
});

const LoadingContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    padding: "16px 0",
});

const TypingIndicator = styled(Box)({
    alignSelf: "flex-start",
    backgroundColor: CUSTOM_STYLE.COLOR.SECONDARY_PAPER_COLOR,
    borderRadius: "12px",
    padding: "8px 12px",
    fontSize: "14px",
    color: CUSTOM_STYLE.COLOR.MAIN_BLACK,
});

interface AIChatModalProps {
    npcName: string;
}

const AIChatModal: React.FC<AIChatModalProps> = ({ npcName }) => {
    const dispatch = useAppDispatch();
    const webLLMState = useAppSelector((state) => state[WEB_LLM_PLUGIN_ID]);
    const aiChatState = useAppSelector((state) => state[AI_CHAT_SLICE_ID]);
    const [inputValue, setInputValue] = useState("");
    const messageListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [aiChatState.messages, aiChatState.isGenerating]);

    const handleSend = () => {
        const text = inputValue.trim();
        if (!text || aiChatState.isGenerating || !webLLMState.isReady) return;
        dispatch(addUserMessage(text));
        dispatch(setPendingUserMessage(text));
        setInputValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation();
        if (e.key === "Enter") handleSend();
    };

    if (webLLMState.isLoading || !webLLMState.isReady) {
        return (
            <LoadingContainer>
                <Typography fontSize="14px" fontWeight="bold">
                    {npcName} is warming up...
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={webLLMState.loadingProgress}
                    sx={{ width: "100%", borderRadius: "4px" }}
                />
                <Typography fontSize="12px" color="text.secondary">
                    {webLLMState.loadingProgress}% — AI guide loading (cached after first visit)
                </Typography>
            </LoadingContainer>
        );
    }

    if (webLLMState.error) {
        return (
            <Typography fontSize="14px" color="error">
                AI unavailable: {webLLMState.error}
            </Typography>
        );
    }

    return (
        <ChatContainer>
            <MessageList ref={messageListRef}>
                {aiChatState.messages.length === 0 && (
                    <Typography fontSize="13px" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
                        Ask me anything about {npcName}!
                    </Typography>
                )}
                {aiChatState.messages.map((msg, i) => (
                    <MessageBubble key={i} role={msg.role}>
                        {msg.content}
                    </MessageBubble>
                ))}
                {aiChatState.isGenerating && aiChatState.messages[aiChatState.messages.length - 1]?.content === "" && (
                    <TypingIndicator>...</TypingIndicator>
                )}
            </MessageList>
            <InputRow>
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a question..."
                    disabled={aiChatState.isGenerating}
                    autoFocus
                />
                <SendButton onClick={handleSend} disabled={aiChatState.isGenerating || !inputValue.trim()}>
                    Send
                </SendButton>
            </InputRow>
        </ChatContainer>
    );
};

export default AIChatModal;
