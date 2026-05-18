import type { ChatMessages, ChatResult } from '@openrouter/sdk/models';

export type SendAiChatInput = {
  messages: ChatMessages[];
};

export async function sendAiChat({ messages }: SendAiChatInput): Promise<ChatResult> {
  const res = await fetch('/api/chat', { method: 'POST', body: JSON.stringify(messages), headers: { 'Content-Type': 'application/json' } });

  const response = await res.json();

  return response;
}
