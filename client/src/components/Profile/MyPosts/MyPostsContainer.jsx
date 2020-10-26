import React from "react";
import {connect} from "react-redux";
import MyPosts from "./MyPosts";
import {addPost, addPostThunk, deletePostThunk} from "../../../redux/profileReducer";


let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts
    }
};

const MyPostsContainer = connect(mapStateToProps, {addPost, addPostThunk, deletePostThunk})(MyPosts);

export default MyPostsContainer;