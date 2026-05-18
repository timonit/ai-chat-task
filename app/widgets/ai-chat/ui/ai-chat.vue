<script lang="ts" setup>
import type { ChatMessages, ChatResult } from '@openrouter/sdk/models';
import { MessageList } from '~/entities/message-list';
import { SendAiChat } from '~/features/send-ai-chat';
import { SpeechToTextBtn } from '~/features/speech-to-text';

const messages = ref<ChatMessages[]>([]);
const text = ref('');
const errors = ref<string[]>([]);

const addText = (newText: string) => {
  text.value = text.value + newText;
}

const setErrors = (newErrors: string[]) => {
  errors.value = newErrors;
}

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

    <UPageList>
      <span v-for="err in errors" :key="err" class="text-xs text-error">- {{ err }}</span>
    </UPageList>

    <SendAiChat
      @response="addMessage"
      @user-message="addUserMessage"
      :context="messages"
      v-model="text"
      v-model:errors="errors"
    >
      <template #textarea-append>
        <SpeechToTextBtn @transcribed="addText" @error="setErrors([$event])" />
      </template>
    </SendAiChat>
  </div>
</template>
