import {authAPI, profileAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {logOut, setToken} from "../utils/tokenHandler";

const SET_USER_DATA = 'authReducer/SET_USER_DATA';
const SET_CAPTCHA = 'authReducer/SET_CAPTCHA';
const LOGOUT = 'authReducer/LOGOUT';
const REGISTRATION = 'authReducer/REGISTRATION';

let initialState = {
    id: null,
    _id: null,
    email: null,
    name: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case(SET_USER_DATA):
            return {
                ...state,
                ...action.payload,
                isAuth: true
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

export const logout = () => ({
    type: LOGOUT
});

export const getUserThunk = () => async dispatch => {

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
        console.log('---response', response)
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
        debugger;

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