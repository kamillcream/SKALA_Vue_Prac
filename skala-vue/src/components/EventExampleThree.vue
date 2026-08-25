<template>
  <main>
    <form @submit.prevent="handleForm">
      <div>
        <label for="name">이름</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="이름을 입력하세요"
          required
        />
      </div>

      <div>
        <label for="age">나이</label>
        <input
          id="age"
          v-model.number="form.age"
          type="number"
          min="1"
          placeholder="나이를 입력하세요"
          required
        />
      </div>

      <fieldset>
        <legend>만족도</legend>

        <label>
          <input v-model="form.satisfaction" type="radio" value="만족" required />
          만족
        </label>

        <label>
          <input v-model="form.satisfaction" type="radio" value="보통" />
          보통
        </label>

        <label>
          <input v-model="form.satisfaction" type="radio" value="불만족" />
          불만족
        </label>
      </fieldset>

      <div>
        <label for="opinion">의견</label>
        <textarea
          id="opinion"
          v-model.trim="form.opinion"
          placeholder="의견을 입력하세요"
        ></textarea>
      </div>

      <button type="submit">설문조사 제출</button>
    </form>

    <button type="button" @click.once="handleClick">한 번만 클릭되는 버튼</button>
  </main>
</template>

<script setup>
import { reactive } from "vue"

const form = reactive({
  name: "",
  age: null,
  satisfaction: "",
  opinion: "",
})

const handleForm = () => {
  alert(
    `${form.name}님의 설문조사가 제출되었습니다.\n` +
      `나이: ${form.age}\n` +
      `만족도: ${form.satisfaction}\n` +
      `의견: ${form.opinion || "없음"}`
  )
}

const handleClick = () => {
  alert("버튼이 클릭되었습니다.")
}
</script>

<style scoped>
main {
  width: min(100% - 32px, 480px);
  margin: 40px auto;
}

form {
  display: grid;
  gap: 20px;
}

form > div {
  display: grid;
  gap: 8px;
}

input,
textarea,
button {
  padding: 10px;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

button {
  margin-top: 12px;
  cursor: pointer;
}
</style>