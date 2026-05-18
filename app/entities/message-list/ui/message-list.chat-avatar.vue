<script setup lang="ts">
defineProps<{ role: string }>();
</script>

<template>
  <div
    class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
    :class="{
      'bg-blue-500': role === 'user',
      'bg-green-500': role === 'assistant'
    }"
  >
    <UIcon
      :name="role === 'user' ? 'mdi-account' : 'mdi-robot'"
      class="w-6 h-6"
    />
  </div>
</template>
