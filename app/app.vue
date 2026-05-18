<script setup>
useHead({
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'ru'
  }
})

const title = 'Nuxt Starter Template'

useSeoMeta({
  title,
  ogTitle: title,
})
</script>

<template>
  <UApp>
    <UMain class="px-20">
      <NuxtPage />
    </UMain>
  </UApp>
</template>
