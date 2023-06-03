import { defineStore } from 'pinia'
import { loginByEmail } from '@/api/login'
import { getToken, removeToken, setToken } from '@/utils/auth'



export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        token: getToken(),
        userDetails: {}
    }),

    getters: {

    },

    actions: {              
        loginByEmail(data) {

            return new Promise((resolve, reject) => {

				let dataPost = {
					email: data.email,
					password: data.password,
				}
			
				loginByEmail(dataPost).then(response => {
					console.log(response)
                    if(response.status == 200) {
                        let responseData = response.data.user
                        let access_token = response.data.access_token
						let go = true

                      

                        if (go) {
							// SITE TOKEN
							this.token = access_token
                            this.userDetails = responseData
							setToken(access_token)
							
							resolve()
						}


                    } else {
                        reject(error)
                    }
					
				}).catch(error => {
					reject(error)
				})

			})

        }
    }
  
   
    
})

