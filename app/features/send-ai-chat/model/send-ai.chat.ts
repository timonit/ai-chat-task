import type { ChatMessages, ChatResult } from '@openrouter/sdk/models';

export type SendAiChatInput = {
  messages: ChatMessages[];
};

export async function sendAiChat({ messages }: SendAiChatInput): Promise<ChatResult> {
  const res = await fetch('/api/chat', { method: 'POST', body: JSON.stringify(messages), headers: { 'Content-Type': 'application/json' } });

  const json = await res.json();

  if (!res.ok) {
    let message = 'Unknown error occurred during speech-to-text conversion.';

    if (json && json.message) message = json.message;

    throw new Error(message);
  }

  return json;
}
