<template>
  <div class="home">
    <h1>欢迎使用校友录 SaaS 管理后台</h1>
    <el-button type="primary" @click="$router.push('/tenants')">租户管理</el-button>
    <el-button type="success" @click="$router.push('/alumni')">校友信息管理</el-button>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>
