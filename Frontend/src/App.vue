<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const message = ref('Connecting...')
onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/test-connection')
    message.value = res.data.message
  } catch (err) {
    message.value = 'Connection failed: ' + err.message
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 class="text-3xl font-bold underline mb-4">
      Hello world!
    </h1>
    <p class="text-xl text-gray-700">{{ message }}</p>
  </div>
</template>

<style scoped></style>
