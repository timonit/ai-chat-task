<script lang="ts" setup>
import { ref } from 'vue'
import { speechToText } from '../model';

const emit = defineEmits<{
  (e: 'transcribed', text: string): void;
  (e: 'error', message: string): void;
}>();

const isRecording = ref(false);
let mediaRecorder: MediaRecorder;

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    const audioChunks: Blob[] = [];

    // recording chunks
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    // when recording stops, process the audio
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

      try {
        if (audioBlob) {
          const result = await speechToText(audioBlob);

          // Emit the transcribed text
          emit('transcribed', result);
        }
      } catch (err: any) {
        emit('error', err.message);
      }
    };

    mediaRecorder.start();
    isRecording.value = true;
  } catch (err: any) {
    emit('error', err);
  }
}

const stopRecording = () => {
  if (mediaRecorder) {
    mediaRecorder.stop();

    // Stop all tracks to release the microphone
    mediaRecorder.stream.getTracks().forEach(track => track.stop());

    isRecording.value = false;
  }
}

const toggleRecording = () => {
  if (isRecording.value) stopRecording();
  else startRecording();
}
</script>

<template>
  <UButton
    :class="{ 'is-recording': isRecording }"
    @click="toggleRecording"
    size="lg"
    color="secondary"
  >
    <UIcon v-if="!isRecording" name="heroicons:microphone" :size="20" />
    <UIcon v-else name="material-symbols:stop" :size="20" />
  </UButton>
</template>
