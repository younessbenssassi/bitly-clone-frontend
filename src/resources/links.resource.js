import api from '@/resources/api.resource'

export default {
    getLinks(params){
        return api.get(`/links`,{params})
    },
    getLink(generatedLink){
        return api.get(`/links/${generatedLink}`)
    },
    generateLink(data){
        return api.post(`/links`,data)
    },
    customLink(data,generatedLink){
        return api.put(`/links/${generatedLink}`,data)
    },
    deleteLink(generatedLink){
        return api.delete(`/links/${generatedLink}`)
    },
}
