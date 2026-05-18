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
  catch(err: any) {
    errors.value = [err.message || err];
  }
  finally {
    model.value = '';
    isSending.value = false;
  };
};
</script>

<template>
  <UForm @submit.prevent="sendMessage" class="flex flex-col md:flex-row items-center gap-2 border-3 border-accented rounded-2xl">
    <slot name="textarea-append" :props="{ disabled: isSending, class: 'h-full' }" />

    <UTextarea
      v-model="model"
      placeholder="Type your message..."
      :disabled="isSending"
      class="w-full border-0 "
      variant="none"
      :rows="1"
      :maxrows="2"
      size="xl"
      color="error"
      help="Press Ctrl + Enter to send"
      @keydown.ctrl.enter.prevent="sendMessage"
    >
      <template #trailing>
      </template>
    </UTextarea>

    <div class="flex justify-end items-stretch self-stretch w-full md:w-auto">
      <UButton
        type="submit"
        :disabled="disabled"
        :loading="isSending"
        color="primary"
        class="rounded-xl w-13 h-14 justify-center text-white"
      >
        <UIcon v-if="!isSending" name="weui:arrow-filled" :size="40" />
      </UButton>
    </div>

  </UForm>
</template>
