<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const message = ref('Connecting...')
const message1 = ref('Connecting...')
const message2 = ref('Connecting...')

async function testConnection() {
  try {
    const res = await axios.get(`${BASE_URL}/api/test-connection`)
    message.value = res.data.message
  } catch (err) {
    message.value = 'Connection failed: ' + err.message
  }
}

async function testDatabase() {
  try {
    const res = await axios.get(`${BASE_URL}/api/data`)
    message1.value = res.data.message
  } catch (err) {
    message1.value = 'Database Connection failed: ' + err.message
  }
}

async function testHealth() {
  try {
    const res = await axios.get(`${BASE_URL}/api/health`)
    message2.value = res.data.message
  } catch (err) {
    message2.value = "Health failed: " + err.message
  }
}

onMounted(async () => {
  testConnection();
  testDatabase();
  testHealth();
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 class="text-3xl font-bold underline mb-4">
      Hello world!
    </h1>
    <p class="text-xl text-gray-700">{{ message }}</p>
    <p class="text-xl text-red-500">{{ message1 }}</p>
    <p class="text-xl text-green-500">{{ message2 }}</p>
  </div>
</template>

<style scoped></style>