<script setup lang="ts">
import type { ChatMessages } from '@openrouter/sdk/models';
import MessageListChatAvatar from './message-list.chat-avatar.vue';
import { set } from '@nuxt/ui/runtime/utils/index.js';

type MessageListProps = {
  messages: ChatMessages[]
};

const props = defineProps<MessageListProps>();
const containerEl = useTemplateRef<HTMLDivElement>('containerEl');

watch(() => props, () => {
  setTimeout(() => {
    if (containerEl.value) {
      containerEl.value.scrollTo({
        top: containerEl.value.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, 100);
}, { deep: true });
</script>

<template>
  <div ref="containerEl" class="w-full px-3 rounded-lg overflow-y-auto h-full" style="scrollbar-width: none;">

    <div class="flex flex-col gap-3">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="flex gap-3"
      >
        <MessageListChatAvatar :role="message.role" />

        <div
          class="flex-1 max-w-[80%] rounded-2xl px-4 py-3"
          :class="{
            'bg-blue-100 text-gray-800': message.role === 'user',
          }"
        >
          <p
            class="whitespace-pre-wrap"
            :class="{
              'text-gray-100': message.role === 'assistant',
              'text-gray-700': message.role === 'user'
             }"
          >{{ message.content }}</p>
        </div>
      </div>
    </div>

    <div v-if="messages.length === 0" class="flex flex-col justify-start gap-8 h-full w-full">
      <div class="flex justify-center rounded-2xl bg-primary w-max p-5 mb-10">
        <UIcon name="mynaui:message-solid" :size="30" />
      </div>
      <span class="text-5xl font-semibold mb-5">Hi there!</span>
      <span class="text-7xl font-semibold">What would you like to know?</span>
      <span class="text-4xl text-gray-400 w-5/7">Use one of the most common prompts below or ask your own question</span>
    </div>
  </div>
</template>
