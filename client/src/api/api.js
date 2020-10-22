import axios from "axios";
import {getToken} from "../utils/tokenHandler";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://sokkkkcial-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "506264c7-e08d-447a-ae53-bbc91bc9de7d"
    }
});

const newInstance = axios.create({
    baseURL: 'http://localhost:5000/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const authAPI = {

    me() {
        return instance
            .get(`auth/me`)
            .then(resp => resp.data);
    },

    login(email, password) {
        return newInstance
            .post(`auth`, {email, password})
            .then(resp => resp.data);
    },
    getUserData() {
        return newInstance
            .get('auth', {
                headers: {
                    'x-auth-token': getToken()
                }
            })
    }

    /*logOut(){
        return instance
            .delete(`/auth/login`)
            .then(resp => resp.data);
    }*/
};

export const usersAPI = {
    getUsers() {
        return newInstance
            .get(`profile`)
            .then(resp => resp.data);
    },

    unFollow(userId) {
        return instance
            .delete(`follow/${userId}`)
            .then(resp => resp.data);
    },

    follow(userId) {
        return instance
            .post(`follow/${userId}`)
            .then(resp => resp.data);
    },

    getProfile(userId) {
        console.warn("Use profileAPI obj!");
        return profileAPI.getProfile(userId);
    }
};

export const profileAPI = {

    getProfile(userId) {
        return instance
            .get(`profile/${userId}`)
            .then(resp => resp.data)
    },

    getStatus(userId) {
        return instance
            .get(`profile/status/${userId}`)
    },

    updateStatus(status) {
        return instance
            .put(`profile/status`, {status})
    },

    updatePhoto(photo) {
        const formData = new FormData();
        formData.append("image", photo);
        return instance
            .put(`profile/photo`, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
    },

    updateProfileData(data) {
        return instance
            .put(`profile`, data)
    }
};

export const securityAPI = {
    getCaptcha() {
        return instance
            .get('/security/get-captcha-url')
    }
};

