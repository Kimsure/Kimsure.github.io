<script setup lang="ts">
import { ref } from 'vue'

interface Message {
  content: string
  isUser: boolean
}

const messages = ref<Message[]>([])
const inputMessage = ref('')

const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  messages.value.push({
    content: inputMessage.value,
    isUser: true
  })
  
  // 模拟AI回复
  setTimeout(() => {
    messages.value.push({
      content: '我是AI助手，很高兴为您服务！',
      isUser: false
    })
  }, 1000)
  
  inputMessage.value = ''
}
</script>

<template>
  <main class="min-h-screen max-w-[780px] mx-auto px-5 relative pb-32">
    <!-- 聊天列表 -->
    <div class="py-5 space-y-4">
      <div v-for="(message, index) in messages" :key="index"
           :class="[message.isUser ? 'flex justify-end' : 'flex justify-start']">
        <div :class="[
          'max-w-[80%] rounded-[18px] px-[18px] py-[10px]',
          message.isUser ? 'bg-[#4E8DF5] text-white' : 'bg-white border border-gray-200 text-black'
        ]">
          {{ message.content }}
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-[780px] px-5">
      <div class="flex gap-2 w-full border border-gray-200 rounded-[18px] bg-white p-2">
        <textarea
          v-model="inputMessage"
          placeholder="你有什么要我帮助的吗？"
          class="flex-1 resize-none outline-none min-h-[44px] max-h-32 px-2"
          rows="1"
          @keydown.enter.prevent="sendMessage"
        ></textarea>
        <button
          @click="sendMessage"
          class="p-2 bg-[#4E8DF5] rounded-[18px] hover:bg-[#4080E6] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </div>
  </main>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  background: white;
  color: black;
}
</style>
