import api from '@/resources/api.resource'

export default {
    createUser(data){
        return api.post(`/create-account`,data)
    },
    updateUser(data){
        return api.put(`/update-account`,data)
    },
    deleteUser(){
        return api.delete(`/delete-account`)
    },
}
