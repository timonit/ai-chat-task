<script setup lang="ts">
import type { ChatMessages } from '@openrouter/sdk/models';
import MessageListChatAvatar from './message-list.chat-avatar.vue';

type MessageListProps = {
  messages: ChatMessages[]
};

const props = defineProps<MessageListProps>();
</script>

<template>
  <div class="w-full px-3 rounded-lg overflow-auto">

    <div class="overflow-y-auto p-4 space-y-4">
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

    <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-[40dvh] text-gray-400">
      <UIcon name="i-heroicons-chat-bubble-oval-left-ellipsis-solid" class="w-12 h-12 mb-4" />
      <p class="text-lg">No messages yet. Start the conversation!</p>
    </div>
  </div>
</template>
