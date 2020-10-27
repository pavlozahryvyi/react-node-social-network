import React from "react";
import style from "./Post.module.css";
import {Comments} from "./Comments/Comments";
import {addCommentThunk} from "../../../../redux/profileReducer";

const Post = ({post, deletePostThunk, isOwner, addCommentThunk}) => {

    const deletePost = (id, text) => {
        if (window.confirm(`Do you want to delete the post ${text}?`)) {
            deletePostThunk(id)
        }

    }

    const getCommentText = (text) => {
        addCommentThunk(post._id, text);
    }

    return (
        <div className={style.postWrapper}>
            <div className={style.item}>
                <div className={style.postInfo}>
                    <img
                        // src="https://static.turbosquid.com/Preview/2019/02/12__04_46_30/cirlce_43.jpgF75B8343-6B7D-4C48-9F15-26C555FCB2DDZoom.jpg"
                        src={post.avatar}
                        alt=""/>
                    <div className={style.postLikes}>
                        <span>132</span>
                    </div>
                </div>
                <div className={style.message}>
                    {post.text}
                </div>
                {isOwner && (
                    <div className={style.deleteBtn} onClick={() => deletePost(post._id, post.text)}>
                        [X]
                    </div>)
                }
            </div>
            <Comments
                getCommentText={getCommentText}
                comments={post.comments}
            />
        </div>
    );
};

export default Post;