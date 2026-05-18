<script lang="ts" setup>
import type { ChatMessages, ChatResult } from '@openrouter/sdk/models';
import { MessageList } from '~/entities/message-list';
import { SendAiChat } from '~/features/send-ai-chat';

const messages = ref<ChatMessages[]>([]);

const addMessage = (result: ChatResult) => {
  result.choices.forEach(choice => {
    messages.value.push(choice.message);
  });
}

const addUserMessage = (message: string) => {
  messages.value.push({ role: 'user', content: message });
}
</script>

<template>
  <div class="md:p-10 p-4 h-dvh flex flex-col gap-4 justify-end">
    <MessageList :messages="messages" />

    <SendAiChat @response="addMessage" @user-message="addUserMessage" :context="messages" />
  </div>
</template>
