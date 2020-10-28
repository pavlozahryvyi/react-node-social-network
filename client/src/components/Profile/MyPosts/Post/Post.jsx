import React, {useState} from "react";
import style from "./Post.module.css";
import {Comments} from "./Comments/Comments";
import {likePostThunk} from "../../../../redux/profileReducer";

const Post = ({
                  post,
                  deletePostThunk,
                  isOwner,
                  addCommentThunk,
                  deleteCommentThunk,
                  userId,
                  getActivePost,
                  activeComments,
                  likePostThunk,
                  unLikePostThunk
              }) => {

    const deletePost = (id, text) => {
        if (window.confirm(`Do you want to delete the post ${text}?`)) {
            deletePostThunk(id)
        }
    }

    const [showComments, setShowComments] = useState(false);

    // console.log('---active comments', activeComments);
    // console.log('---show comments', showComments);
    // console.log('-----------------');

    const getCommentText = (text) => {
        addCommentThunk(post._id, text);
    }

    const getCommentId = (commentId) => {
        deleteCommentThunk(post._id, commentId, userId);
    }

    return (
        <div className={style.postWrapper}>
            <div className={style.postItem}
                 onClick={() => {
                     getActivePost(post._id);
                 }}
            >
                <div className={style.post}>
                    {post.text}
                </div>
                <div className={style.postInfo}>
                    <div className={style.postUser}>
                        <div className={style.postImg}>
                            <img
                                src={post.avatar}
                                alt=""/>
                        </div>
                        <p>{post.name}</p>
                    </div>
                    <button onClick={() => likePostThunk(post._id)}>[LIKE] {post.likes.length}</button>
                    <button onClick={() => unLikePostThunk(post._id)}>[UNLIKE]</button>
                </div>
                {isOwner && (
                    <div className={style.deleteBtn} onClick={() => deletePost(post._id, post.text)}>
                        [X]
                    </div>)
                }
            </div>
            {(activeComments) && (
                <Comments
                    isOwner={isOwner}
                    getCommentText={getCommentText}
                    getCommentId={getCommentId}
                    comments={post.comments}
                />)
            }
        </div>
    );
};

export default Post;