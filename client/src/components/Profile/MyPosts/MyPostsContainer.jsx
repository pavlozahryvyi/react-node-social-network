import React from "react";
import {connect} from "react-redux";
import MyPosts from "./MyPosts";
import {addCommentThunk, addPost, addPostThunk, deletePostThunk} from "../../../redux/profileReducer";


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
        addCommentThunk
    })(MyPosts);

export default MyPostsContainer;