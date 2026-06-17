import PluginHandler from "../PluginHandler";
import { WEB_LLM_PLUGIN_ID, AI_CHAT_SLICE_ID, DEFAULT_MODEL_ID } from "./constants";
import { setIsLoading, setLoadingProgress, setIsReady, setError } from "./webLLMSlice";
import {
    clearPendingMessage,
    setIsGenerating,
    appendAssistantPlaceholder,
    updateLastAssistantMessage,
} from "./aiChatSlice";
import { ChatMessage } from "./types";
import { WebLLMStateInterface } from "./webLLMSlice";
import { AIChatStateInterface } from "./aiChatSlice";

interface PluginState {
    [WEB_LLM_PLUGIN_ID]: WebLLMStateInterface;
    [AI_CHAT_SLICE_ID]: AIChatStateInterface;
    [key: string]: unknown;
}

interface PluginStore {
    getState: () => PluginState;
    dispatch: (action: unknown) => unknown;
}

export interface WebLLMHandlerConfig {
    dispatch: PluginStore["dispatch"];
    store: PluginStore;
    systemPrompt: string;
    modelId?: string;
}

export class WebLLMHandler implements PluginHandler {
    public pluginId: string = WEB_LLM_PLUGIN_ID;

    private dispatch: PluginStore["dispatch"];
    private store: PluginStore;
    private systemPrompt: string;
    private modelId: string;
    private engine: unknown = null;
    private isProcessing = false;

    constructor({ dispatch, store, systemPrompt, modelId }: WebLLMHandlerConfig) {
        this.dispatch = dispatch;
        this.store = store;
        this.systemPrompt = systemPrompt;
        this.modelId = modelId ?? DEFAULT_MODEL_ID;
    }

    public init(): void {
        this.loadModel();
    }

    public deinit(): void {
        if (this.engine) {
            (this.engine as { unload: () => void }).unload();
            this.engine = null;
        }
    }

    public update(_deltaTime: number): void {
        if (this.isProcessing) return;
        const state = this.store.getState();
        const aiChat = state[AI_CHAT_SLICE_ID];
        if (aiChat.pendingUserMessage) {
            this.isProcessing = true;
            this.generateResponse([...aiChat.messages], aiChat.pendingUserMessage);
        }
    }

    private async loadModel(): Promise<void> {
        if (typeof window === "undefined") return;

        try {
            this.dispatch(setIsLoading(true));
            this.dispatch(setLoadingProgress(0));

            const { CreateMLCEngine } = await import("@mlc-ai/web-llm");

            this.engine = await CreateMLCEngine(this.modelId, {
                initProgressCallback: (report: { progress: number }) => {
                    this.dispatch(setLoadingProgress(Math.round(report.progress * 100)));
                },
            });

            this.dispatch(setIsReady(true));
            this.dispatch(setIsLoading(false));
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to load AI model";
            this.dispatch(setError(message));
            this.dispatch(setIsLoading(false));
        }
    }

    private async generateResponse(history: ChatMessage[], userMessage: string): Promise<void> {
        if (!this.engine) {
            this.isProcessing = false;
            return;
        }

        try {
            this.dispatch(clearPendingMessage());
            this.dispatch(setIsGenerating(true));
            this.dispatch(appendAssistantPlaceholder());

            const messages = [
                { role: "system" as const, content: this.systemPrompt },
                ...history,
                { role: "user" as const, content: userMessage },
            ];

            const engine = this.engine as {
                chat: {
                    completions: {
                        create: (params: {
                            messages: { role: string; content: string }[];
                            stream: boolean;
                        }) => Promise<AsyncIterable<{ choices: { delta: { content?: string } }[] }>>;
                    };
                };
            };

            const chunks = await engine.chat.completions.create({ messages, stream: true });

            let response = "";
            for await (const chunk of chunks) {
                response += chunk.choices[0]?.delta?.content ?? "";
                this.dispatch(updateLastAssistantMessage(response));
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "Generation failed";
            this.dispatch(updateLastAssistantMessage(`Error: ${message}`));
        } finally {
            this.dispatch(setIsGenerating(false));
            this.isProcessing = false;
        }
    }
}
