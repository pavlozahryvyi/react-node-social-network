import {createSelector} from "reselect";

export const getUsers = state => {
    return state.usersPage.users;
}
export const getUsersSelector = state => {
    return getUsers(state).filter( u => true );
}

/*
* getUsers - примитивный селектор
* users => { return users.filter(u => true)} - выполняет сложную логику с данными,
* которые получены из примитивного селектора, и при этом
* getUserSuperSelector - принимает state*/

export const getUserSuperSelector = createSelector( getUsers, users => {
    return users.filter(u => true)
});

export const getPageSize = state => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = state => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = state => {
    return state.usersPage.currentPage
}

export const getIsFetching = state => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = state => {
    return state.usersPage.followingInProgress
}