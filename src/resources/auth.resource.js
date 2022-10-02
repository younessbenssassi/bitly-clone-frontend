import api from '@/resources/api.resource'

export default {
    Login(data){
        return api.post(`/login`,data)
    },
    Logout(){
        return api.post(`/logout`)
    },
    getAuthState(payload){
        return api.get(`/get-auth-state`,payload)
    },
}
