<script setup lang="ts">
import type { ChatMessages, ChatResult } from '@openrouter/sdk/models';
import { sendAiChat } from '../model';

const props = defineProps<{ context?: ChatMessages[] }>();
const emit = defineEmits<{(event: 'response', result: ChatResult): void; (event: 'user-message', message: string): void}>();
const model = defineModel<string>({ default: '' });
const errors = defineModel<string[]>('errors');
const isSending = ref(false);

const disabled = computed(() => isSending.value || !model.value.trim());

const sendMessage = async () => {
  if (disabled.value) return;

  isSending.value = true;

  const messages = props.context ? [...props.context] : [];
  messages.push({ role: 'user', content: model.value });

  emit('user-message', model.value);

  try {
    const result = await sendAiChat({ messages });
    emit('response', result);
  }
  catch(error) {
    errors.value = [error instanceof Error ? error.message : String(error)];
  }
  finally {
    model.value = '';
    isSending.value = false;
  };
};
</script>

<template>
  <UForm @submit.prevent="sendMessage" class="flex flex-col md:flex-row items-start gap-2">
    <UFormField help="Ctrl + Enter to send" class="w-full" :errors="errors">
      <UTextarea
        v-model="model"
        placeholder="Type your message..."
        :disabled="isSending"
        class="w-full"
        :rows="2"
        help="Press Ctrl + Enter to send"
        @keydown.ctrl.enter.prevent="sendMessage"
      >
        <template #trailing>
          <slot name="textarea-append" :props="{ disabled: isSending }" />
        </template>
      </UTextarea>
    </UFormField>

    <div class="flex justify-end w-full md:w-auto pt-1">
      <UButton
        type="submit"
        :disabled="disabled"
        :loading="isSending"
        label="Send"
        size="xl"
      />
    </div>

  </UForm>
</template>
