import {authAPI, profileAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {logOut, setToken} from "../utils/tokenHandler";

const SET_USER_DATA = 'authReducer/SET_USER_DATA';
const GET_USER_DATA = 'authReducer/GET_USER_DATA';
const SET_CAPTCHA = 'authReducer/SET_CAPTCHA';
const LOGOUT = 'authReducer/LOGOUT';
const REGISTRATION = 'authReducer/REGISTRATION';

let initialState = {
    _id: null,
    email: null,
    name: null,
    isAuth: false,
    isLoading: false
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_USER_DATA:
            console.log('---isLoading true');
            return {
                ...state,
                isLoading: true
            }
        case SET_USER_DATA:
            console.log('---isLoading false');
            return {
                ...state,
                ...action.payload,
                isAuth: true,
                isLoading: false,
            };
        case SET_CAPTCHA:
            return {
                ...state,
                captchaUrl: action.url
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export const setAuthUserData = (data) => ({
    type: SET_USER_DATA,
    payload: data
});

export const getAuthUserData = () => ({
    type: GET_USER_DATA,
});

export const logout = () => ({
    type: LOGOUT
});

export const getUserThunk = () => async dispatch => {
    dispatch(getAuthUserData());
    try {
        const userInfo = await authAPI.getUserData();
        dispatch(setAuthUserData(userInfo.data))
    } catch (error) {

    }
}

export const loginThunk = ({email, password}) => async dispatch => {

    try {
        const response = await authAPI.login(email, password);
        setToken(response.token)

        dispatch(getUserThunk());

    } catch (error) {
        console.log("--- error", error);
        console.log("--- error text", error.response.data.errors[0].msg);
        const errorText = error.response.data.errors[0].msg || "some error";
        const action = stopSubmit("login", {_error: errorText});
        dispatch(action);
    }
};

export const createProfileThunk = (data) => async dispatch => {
    try {
        const response = await profileAPI.createProfile(data);
        dispatch(getUserThunk());

    } catch (error) {
        const errorText = error.response.data.errors[0].msg || "some error";
        const action = stopSubmit("registration", {_error: errorText});
        dispatch(action);
    }
}

export const registrationThunk = (data) => async dispatch => {

    try {
        const response = await authAPI.registration(data);
        setToken(response.token)

        dispatch(createProfileThunk(data));
    }catch (error){
        const errorText = error.response.data.errors[0].msg || "some error";
        const action = stopSubmit("login", {_error: errorText});
        dispatch(action);
    }
};

export const logoutThunk = () => async dispatch => {

    logOut();
    dispatch(logout());
};

export default authReducer;