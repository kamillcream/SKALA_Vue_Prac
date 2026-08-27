<template>
  <div>
    <h3>실습 1. 회원가입 Form & 인풋 제어</h3>
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
  <div>
    <h3>실습 2. 커머스 상품 수량 및 평점 시스템</h3>
    <el-card>
      <label>구매 수량 선택: </label>
      <el-input-number v-model="productQuantity"></el-input-number>
    </el-card>
    <el-card>
      <label>상품 만족도 별점: </label>
      <el-input-number :min="1" :max="5" v-model="productRate"></el-input-number>
    </el-card>
    <el-card>
      <label>실시간 장부 요약: </label>
      <p>{{ productSummary }}</p>
    </el-card>
  </div>

  <div>
    <h3>실습 3. 시스템 피드백 & 프로그레스 인터랙션</h3>
    <el-button @click="confirmDelete">서버 파일 삭제 테스트</el-button>
    <el-button @click="startDownload">데이터 동기화 시작</el-button>
    <el-progress :percentage="downloadProgress"></el-progress>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  ElMessage,
  ElButton,
  ElCard,
  ElInput,
  ElSwitch,
  ElInputNumber,
  ElMessageBox,
  ElProgress,
} from 'element-plus'
const userForm = ref({
  email: '',
  agree: false,
})

const productQuantity = ref(0)
const productRate = ref(4)
const productSummary = computed(() => {
  return '선택 수량 ' + productQuantity.value + '개 / ' + '내가 준 점수 ' + productRate.value + '점'
})

const isDownloading = ref(false)
const downloadProgress = ref(0)

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

const confirmDelete = () => {
  ElMessageBox.confirm('서버에서 해당 파일을 영구히 삭제하시겠습니까?', '🔥 최종 경고', {
    confirmButtonText: '네, 삭제합니다',
    cancelButtonText: '취소',
    type: 'danger',
  })
    .then(() => {
      ElMessage.success('🗑️ 파일이 안전하게 파쇄되었습니다.')
    })
    .catch(() => {
      ElMessage.info('❌ 삭제 작업이 취소되었습니다.')
    })
}

const startDownload = () => {
  if (isDownloading.value) return (isDownloading.value = true)
  downloadProgress.value = 0
  const interval = setInterval(() => {
    downloadProgress.value += 20
    if (downloadProgress.value >= 100) {
      clearInterval(interval)
      isDownloading.value = false
      ElMessage.success('💾 대용량 데이터 로드가 완료되었습니다!')
    }
  }, 400)
}
</script>

<style></style>
