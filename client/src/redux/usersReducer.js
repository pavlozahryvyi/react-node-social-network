import {usersAPI} from "../api/api";

const FOLLOW = "userReducer/FOLLOW";
const UNFOLLOW = "userReducer/UNFOLLOW";
const SET_USERS = "userReducer/SET_USERS";
const SET_CURRENT_PAGE = "userReducer/SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = 'userReducer/SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'userReducer/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'userReducer/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map((user => user.id === action.userId ? {...user, followed: true} : user)),
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map((user => user.id === action.userId ? {...user, followed: false} : user)),
            };
        }
        case SET_USERS: {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.page}
        }
        case SET_TOTAL_COUNT: {
            return {...state, totalUsersCount: action.totalCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }

        default:
            return state;
    }
};

export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unFollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setTotalUsersCount = (totalCount = 100) => ({type: SET_TOTAL_COUNT, totalCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (followingInProgress, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    followingInProgress,
    userId
});

export const getUsersThunk = (currentPage, pageSize) => async dispatch => {

    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount( data.totalCount));
};

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) =>{

    dispatch(toggleFollowingProgress(true, userId));
    const response = await apiMethod(userId);

    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }

    dispatch(toggleFollowingProgress(false, userId));

};

export const followThunk = userId => async dispatch => {

    await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
};

export const unFollowThunk = userId => async dispatch => {

    await followUnfollowFlow(dispatch, userId, usersAPI.unFollow.bind(usersAPI), unFollowSuccess)
};

export default usersReducer;