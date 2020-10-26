import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {handleError} from "../utils/errorHandlers";

const ADD_POST = "profileReducer/ADD_POST";
const DELETE_POST = "profileReducer/DELETE_POST";
const SET_USER_PROFILE = 'profileReducer/SET_USER_PROFILE';
const GET_USER_PROFILE = 'GET_USER_PROFILE';
const SET_USER_STATUS = 'profileReducer/SET_USER_STATUS';
const SAVE_PHOTO_SUCCESS = 'profileReducer/SAVE_PHOTO_SUCCESS';
const UPDATE_DATA_SUCCESS = 'profileReducer/UPDATE_DATA_SUCCESS';

const SET_POSTS = 'profile/SET_POSTS'


let initialState = {
    posts: [],
    profile: null,
    isLoading: false,
    status: ''
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case (GET_USER_PROFILE):
            return {
                ...state,
                isLoading: true
            };
        case (SET_USER_PROFILE):
            return {
                ...state,
                profile: action.profile,
                isLoading: false
            };
        case (SET_USER_STATUS):
            return {
                ...state,
                status: action.status
            };
        case (SET_POSTS):
            return {
                ...state,
                posts: action.payload
            };
        case SAVE_PHOTO_SUCCESS :
            debugger
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: {
                        ...action.photos
                    }
                }
            }
        default:
            return state;

    }
};

const getUserProfile = () => ({type: GET_USER_PROFILE})
const setUserProfile = profile => ({type: SET_USER_PROFILE, profile});
const setUserStatus = status => ({type: SET_USER_STATUS, status});

export const addPost = (newPostText) => ({type: ADD_POST, newPostText});

export const deletePost = (id) => ({type: DELETE_POST, id});

export const savePhotosSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});

export const updateProfileDataSuccess = () => ({type: UPDATE_DATA_SUCCESS})


export const setPosts = (payload) => ({type: SET_POSTS, payload})


export const getProfileThunk = (userId) => async dispatch => {
    dispatch(getUserProfile());
    let response;
    if (userId) {
        response = await profileAPI.getProfile(userId);
    } else {
        response = await profileAPI.getMyProfile();
    }
    dispatch(setUserProfile(response.data));
};

export const getUserStatus = userId => async dispatch => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(response.data));
};

export const updateStatus = status => async dispatch => {

    try {
        const response = await profileAPI.updateStatus(status);

        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
    } catch (error) {
        //dispatch
        //handle error
        //show error massage
    }

};

export const savePhoto = photo => async dispatch => {

    const response = await profileAPI.updatePhoto(photo);

    if (response.data.resultCode === 0) {
        dispatch(savePhotosSuccess(response.data.data.photos));
    }
}

export const saveProfileData = data => async (dispatch, getState) => {
    const newData = {
        ...data,
        ...data.location,
        ...data.contacts,
        skills: data.skills.join()
    }
    const response = await profileAPI.updateProfileData(newData);
    console.log('---edit resp', response)
}

export const getPostsThunk = id => async (dispatch, getState) => {

    const profileId = id || getState().auth._id;
    const posts = await profileAPI.getPosts(profileId);
    dispatch(setPosts(posts));
}

export const addPostThunk = data => async dispatch => {

    const response = await profileAPI.addPost(data);
    console.log('---add post response', response)
}

export default profileReducer;
