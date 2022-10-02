import axios from 'axios';
import store from '@/store';
import router from "@/router";
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 5000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        responseType: "json",
    },
});

axiosInstance.interceptors.request.use(
    config => {
        config.headers.Authorization = 'Bearer '+store.state.auth.access_token;
        return config
    }, error => Promise.reject(error));


axiosInstance.interceptors.response.use(function (response) {
    return response
}, function (error) {
    console.log(error.response);
    if (error.response && error.response.status === 401) {
        store.commit('auth/resetAuthState');
        router.push({name: 'Login'});
        return error.response
    }

    else if (error.response && error.response.status === 403) {
        store.commit('auth/resetAuthState');
        router.push({name: 'Login'});
        return error.response
    }
    return error.response;
})


export default axiosInstance
