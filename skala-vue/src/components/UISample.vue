<template>
  <div>
    <el-card>
      <label>이메일 주소: </label>
      <el-input v-model="userForm.email"></el-input>
    </el-card>
    <el-card>
      <el-switch v-model="userForm.agree"></el-switch>
      <label>개인정보 수집 및 필수 이용약관에 동의합니다.</label>
    </el-card>
    <el-button @click="handleRegister"> 회원가입하기 </el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElButton, ElCard, ElInput, ElSwitch } from 'element-plus'
const userForm = ref({
  email: '',
  agree: false,
})

const handleRegister = () => {
  if (!userForm.value.email.includes('@')) {
    ElMessage.error('❌ 올바른 이메일 형식이 아닙니다.')
    return
  }
  if (!userForm.value.agree) {
    ElMessage.warning('⚠️ 이용약관에 동의하셔야 합니다.')
    return
  }
  ElMessage.success('🎉 가입 신청이 정상적으로 완료되었습니다!')
}
</script>

<style></style>
