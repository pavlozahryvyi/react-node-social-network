import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {logOut, setToken} from "../utils/tokenHandler";

const SET_USER_DATA = 'authReducer/SET_USER_DATA';
const SET_CAPTCHA = 'authReducer/SET_CAPTCHA';
const LOGOUT = 'authReducer/LOGOUT';

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

export const loginThunk = (email, password) => async dispatch => {

    try {
        const response = await authAPI.login(email, password);
        setToken(response.token)

        dispatch(getUserThunk());

    } catch (error) {
        console.log("--- caught error", error)
    }
};

export const logoutThunk = () => async dispatch => {

    logOut();
    dispatch(logout());
};

export default authReducer;