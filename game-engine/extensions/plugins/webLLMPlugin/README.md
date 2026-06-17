# webLLMPlugin

Runs a small language model entirely in the visitor's browser via WebGPU. No API key, no server, no ongoing cost. The model is downloaded once from Hugging Face's CDN and cached in the browser's IndexedDB — return visits load instantly.

Exposes two Redux slices: one for model loading state (`webLLM`) and one for conversation state (`aiChat`). Any game object can open a chat session by dispatching `setPendingUserMessage` — the plugin picks it up on the next game loop frame and streams the response token-by-token.

## How it works

`WebLLMHandler.init()` calls `loadModel()` without awaiting, so the game starts immediately while the model downloads in the background. Each `update()` frame checks `aiChat.pendingUserMessage`; when set, it runs inference and streams tokens into `aiChat.messages` via `updateLastAssistantMessage`.

The system prompt is provided by the consumer at construction time — the engine stays generic and knows nothing about the specific game's content.

## Installation

1. Add both reducers to your Redux store:

```ts
import {
    WEB_LLM_PLUGIN_ID,
    AI_CHAT_SLICE_ID,
    webLLMReducer,
    aiChatReducer,
} from "game-engine/extensions/plugins/webLLMPlugin";

const makeStore = () =>
    configureStore({
        reducer: {
            [WEB_LLM_PLUGIN_ID]: webLLMReducer,
            [AI_CHAT_SLICE_ID]: aiChatReducer,
            // ...
        },
    });
```

2. Add `WebLLMHandler` to the `plugins` array in `GameLoop.getInstance`:

```tsx
import { WebLLMHandler } from "game-engine/extensions/plugins/webLLMPlugin";

GameLoop.getInstance({
    plugins: [
        // ...
        new WebLLMHandler({
            dispatch,
            store: appStore,
            systemPrompt: "You are a guide for...", // your content here
        }),
    ],
    modules: [ /* ... */ ],
});
```

3. To open a chat session from any React component, dispatch two actions:

```ts
import { addUserMessage, setPendingUserMessage } from "game-engine/extensions/plugins/webLLMPlugin";

dispatch(addUserMessage(userText));       // adds to message history
dispatch(setPendingUserMessage(userText)); // triggers inference on next frame
```

4. Read model and chat state in any component:

```ts
import { WEB_LLM_PLUGIN_ID, AI_CHAT_SLICE_ID } from "game-engine/extensions/plugins/webLLMPlugin";

const webLLM = useAppSelector((state) => state[WEB_LLM_PLUGIN_ID]);
// webLLM.isLoading, webLLM.loadingProgress (0–100), webLLM.isReady, webLLM.error

const aiChat = useAppSelector((state) => state[AI_CHAT_SLICE_ID]);
// aiChat.messages, aiChat.isGenerating
```

## Config options

| Option         | Type           | Default                            | Description                              |
| -------------- | -------------- | ---------------------------------- | ---------------------------------------- |
| `dispatch`     | Redux dispatch | required                           | Used to dispatch slice actions           |
| `store`        | Redux store    | required                           | Used to read state each frame            |
| `systemPrompt` | `string`       | required                           | Injected as the `system` message         |
| `modelId`      | `string`       | `Qwen2.5-0.5B-Instruct-q4f16_1`   | Any model ID supported by web-llm        |

## Browser requirements

Requires WebGPU support (Chrome 113+, Edge 113+). Safari has partial support. If WebGPU is unavailable, `loadModel()` will catch the error and dispatch it to `webLLM.error` — read this in your UI to show a graceful fallback message.

## Model size guide

| Model ID                              | Size   | Quality     |
| ------------------------------------- | ------ | ----------- |
| `SmolLM2-360M-Instruct-q4f16_1`       | ~200MB | Basic Q&A   |
| `Qwen2.5-0.5B-Instruct-q4f16_1`       | ~400MB | Good (default) |
| `Phi-3.5-mini-instruct-q4f16_1`       | ~2GB   | High quality |
