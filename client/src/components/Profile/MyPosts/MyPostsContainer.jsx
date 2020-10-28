import React from "react";
import {connect} from "react-redux";
import MyPosts from "./MyPosts";
import {
    addCommentThunk,
    addPost,
    addPostThunk,
    deleteCommentThunk,
    deletePostThunk,
    likePostThunk, unLikePostThunk
} from "../../../redux/profileReducer";


let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts
    }
};

const MyPostsContainer = connect(
    mapStateToProps, {
        addPost,
        addPostThunk,
        deletePostThunk,
        addCommentThunk,
        deleteCommentThunk,
        likePostThunk,
        unLikePostThunk
    })(MyPosts);

export default MyPostsContainer;