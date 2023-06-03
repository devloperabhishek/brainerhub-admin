<template>
    <div class="container">
        <el-card class="card">
            <center>  <h3>Admin login</h3></center>
            <el-form
              :label-position="labelPosition"
              label-width="100px"
              :model="formData"
            >
              <el-form-item label="User Email">
                <el-input v-model="formData.email" />
                <span v-if="isError" style="color:red">Required</span>
              </el-form-item>
              <el-form-item label="Password">
                <el-input type="password" v-model="formData.password" />
                <span v-if="isError" style="color:red">Required</span>
              </el-form-item>
             <el-button style="width:100%" type="primary" @click="handleLogin">Login</el-button>
            </el-form>
            <small>For Testing Use email: admin@gmail.com | password: 123456789</small>
        </el-card>
        </div>
  </template>
  
  <script  setup>
  import { reactive, ref } from 'vue'
  import { useAuthStore } from '../stores/authStore'
  import { useRouter, useRoute } from 'vue-router'
  const router = useRouter()
  const route = useRoute()

  const useStore = useAuthStore()
  const labelPosition = ref('top')
  let isError = ref(false)

  const formData = reactive({
    email: 'admin@gmail.com',
    password: '123456789'
  })

  async function handleLogin() {
    if(!formData.email || !formData.password) {
      isError.value = true;
    } else {
      useStore.loginByEmail(formData)
      .then((res) => {
        console.log('res',res)
        router.push('/products')
      })
      .catch((error) => {
        console.log('error',error)
        router.push('/')
      })
    }



  }
  </script>


<style scoped>
.container {
  margin-top:10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
    width:500px;
}


</style>
  