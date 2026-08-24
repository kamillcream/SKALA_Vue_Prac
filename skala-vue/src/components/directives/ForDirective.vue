<script setup>
import { ref } from 'vue'
const newTopic = ref('')
const topics = ref([{ id: 1, name: 'Reactivity', done: true }, { id: 2, name: 'Components', done: false }, { id: 3, name: 'Directives', done: false }])
function addTopic() {
  const name = newTopic.value.trim()
  if (!name) return
  topics.value.push({ id: Date.now(), name, done: false })
  newTopic.value = ''
}
</script>

<template>
  <article class="directive-card">
    <header class="card-head"><h2>v-for</h2><p>배열을 반복하며 고유한 :key로 각 항목을 추적합니다.</p></header>
    <div class="card-body">
      <form class="controls" @submit.prevent="addTopic"><input v-model="newTopic" placeholder="새 학습 주제" /><button>추가</button></form>
      <ul class="topic-list">
        <li v-for="(topic, index) in topics" :key="topic.id">
          <input v-model="topic.done" type="checkbox" /><span :class="{ done: topic.done }">{{ index + 1 }}. {{ topic.name }}</span><button class="remove" @click="topics.splice(index, 1)">×</button>
        </li>
      </ul>
      <code class="code">v-for="(topic, index) in topics" :key="topic.id"</code>
    </div>
  </article>
</template>

<style scoped>
.topic-list { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.topic-list li { display: flex; gap: 10px; align-items: center; padding: 10px 12px; border: 1px solid #e8ebf2; border-radius: 10px; }
.topic-list span { flex: 1; }
.done { color: #9aa2b3; text-decoration: line-through; }
.remove { padding: 3px 9px; background: #edf0f5; color: #6f788d; }
</style>
