//import {getAuthUserDataThunk} from "./authReducer";

import {authAPI} from "../api/api";

const SET_INITIALIZED = 'appReducer/SET_INITIALIZED';

let initialState = {
    initialized: false,
    globalError: null //for showing popup with amazing error
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case(SET_INITIALIZED):
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
};

const initialisedSuccess = () => ({type: SET_INITIALIZED});

export const initializeApp = () => async dispatch => {
    dispatch(initialisedSuccess());
};

export default appReducer;