import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AI_CHAT_SLICE_ID } from "./constants";
import { ChatMessage } from "./types";

export interface AIChatStateInterface {
    isOpen: boolean;
    activeNpcId: string | null;
    messages: ChatMessage[];
    pendingUserMessage: string | null;
    isGenerating: boolean;
}

const initialState: AIChatStateInterface = {
    isOpen: false,
    activeNpcId: null,
    messages: [],
    pendingUserMessage: null,
    isGenerating: false,
};

export const aiChatSlice = createSlice({
    name: AI_CHAT_SLICE_ID,
    initialState,
    reducers: {
        openAIChat: (state, action: PayloadAction<string>) => {
            state.isOpen = true;
            state.activeNpcId = action.payload;
        },
        closeAIChat: (state) => {
            state.isOpen = false;
            state.activeNpcId = null;
        },
        addUserMessage: (state, action: PayloadAction<string>) => {
            state.messages.push({ role: "user", content: action.payload });
        },
        setPendingUserMessage: (state, action: PayloadAction<string>) => {
            state.pendingUserMessage = action.payload;
        },
        clearPendingMessage: (state) => {
            state.pendingUserMessage = null;
        },
        setIsGenerating: (state, action: PayloadAction<boolean>) => {
            state.isGenerating = action.payload;
        },
        appendAssistantPlaceholder: (state) => {
            state.messages.push({ role: "assistant", content: "" });
        },
        updateLastAssistantMessage: (state, action: PayloadAction<string>) => {
            const last = state.messages[state.messages.length - 1];
            if (last && last.role === "assistant") {
                last.content = action.payload;
            }
        },
        clearMessages: (state) => {
            state.messages = [];
        },
    },
});

export const {
    openAIChat,
    closeAIChat,
    addUserMessage,
    setPendingUserMessage,
    clearPendingMessage,
    setIsGenerating,
    appendAssistantPlaceholder,
    updateLastAssistantMessage,
    clearMessages,
} = aiChatSlice.actions;

export const aiChatReducer = aiChatSlice.reducer;
