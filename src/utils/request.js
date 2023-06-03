import axios from 'axios'
// import { useAuthStore } from '../stores/authStore'
// const useStore  = useAuthStore()
import { getToken } from '@/utils/auth'





// create an axios instance
const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API, // api of base_url
  baseURL: "http://localhost:8080/api/", 
  timeout: 1000000 // request timeout
})


// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (useStore.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
      // config.headers['Access-Control-Allow-Origin'] = '*'
      config.headers['Access-Control-Allow-Headers'] = 'Authorization'
    // }

    // appending device information in headers
    config.headers = { ...config.headers }


    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err: ' + error.message) // for debug
    return Promise.reject(error)
  }
)





export default service
