<template>
    <el-card>
        <el-row>
            <el-col :lg="14" :md="14" :sm="14">
                <RouterLink to="products"><el-button type="primary">Home</el-button></RouterLink> &nbsp;
                <RouterLink to="categories"><el-button type="primary">Category</el-button></RouterLink>&nbsp;
                <RouterLink to="sub-categories"><el-button type="primary">Sub Category</el-button></RouterLink>&nbsp;
            </el-col>
            <el-col :lg="4" :md="4" :sm="4">
                <h3>Welcome: {{ useAuth.userDetails.name }}</h3>
                
            </el-col>
            <el-col :lg="4" :md="4" :sm="4">
                <h3>{{ useAuth.userDetails.email }}</h3>
            </el-col>
            <el-col :lg="2" :md="2" :sm="2">
                <el-button type="primary" @click="handelLogout">logout</el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
  import { removeToken } from '../utils/auth'
  import { useAuthStore } from '../stores/authStore'
  import { RouterLink, RouterView } from 'vue-router'
  import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
  const router = useRouter()
  const route = useRoute()
  const useAuth = useAuthStore()

function handelLogout() {
    removeToken()
    router.push('/')
}



</script>