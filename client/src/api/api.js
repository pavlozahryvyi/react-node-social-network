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
    },

    registration(data) {
        const {email, password, name} = data;
        return newInstance
            .post(`users`, {email, password, name})
            .then(resp => resp.data);
    },
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

};

export const profileAPI = {

    getProfile(userId) {
        return newInstance
            .get(`profile/user/${userId}`, {
                headers: {
                    'x-auth-token': getToken()
                }
            })
    },

    getMyProfile() {
        return newInstance.get('profile/me', {
            headers: {
                'x-auth-token': getToken()
            }
        })
    },

    createProfile(data){
        return newInstance.post('profile', {data}, {
            headers: {
                'x-auth-token': getToken()
            }
        })
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
        return newInstance
            .post(`profile`, data, {
                headers: {
                    'x-auth-token': getToken()
                }
            }).then(resp => resp.data);
    },

    getPosts(id){
        return newInstance
            .get(`posts/user/${id}`, {
                headers: {
                    'x-auth-token': getToken()
                }
            })
            .then(resp => resp.data);
    },

    addPost(text){
        return newInstance
            .post(`posts`, text,{
                headers: {
                    'x-auth-token': getToken()
                }
            })
            .then(resp => resp.data);
    },

    deletePost(id){
        return newInstance
            .delete(`posts/${id}`, {
                headers: {
                    'x-auth-token': getToken()
                }
            })
            .then(resp => resp.data);
    },

    addComment(id, text){
        return newInstance
            .post(`posts/comment/${id}`, text, {
                headers: {
                    'x-auth-token': getToken()
                }
            })
            .then(resp => resp.data);
    },

    deleteComment(postId, commentId){
        return newInstance
            .delete(`posts/comment/${postId}/${commentId}`, {
                headers: {
                    'x-auth-token': getToken()
                }
            })
            .then(resp => resp.data);
    },

    like(postId){
        return newInstance
            .put(`posts/like/${postId}`, {},{
                headers: {
                    'x-auth-token': getToken()
                }
            })
            .then(resp => resp.data);
    },

    unLike(postId){
        return newInstance
            .put(`posts/unLike/${postId}`, {},{
                headers: {
                    'x-auth-token': getToken()
                }
            })
            .then(resp => resp.data);
    },
};

export const securityAPI = {
    getCaptcha() {
        return instance
            .get('/security/get-captcha-url')
    }
};

