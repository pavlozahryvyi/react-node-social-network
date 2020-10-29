import React, {useEffect, useState} from "react";
import style from "./Post.module.css";
import {Comments} from "./Comments/Comments";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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
                  unLikePostThunk,
                  myId
              }) => {
    const deletePost = (id, text) => {
        if (window.confirm(`Do you want to delete the post ${text}?`)) {
            deletePostThunk(id)
        }
    }

    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        checkLike()
    });

    console.log("---show comments", showComments);

    const checkLike = () => {
        if (post.likes.some(like => like.user === myId)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }

    const getCommentText = (text) => {
        addCommentThunk(post._id, text, userId);
    }

    const getCommentId = (commentId) => {
        deleteCommentThunk(post._id, commentId, userId);
    }

    const likeHandler = (cb, postId) => {
        cb(postId, userId)
    }

    return (
        <div className={style.postWrapper}>
            <div className={style.postItem}>
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
                    <div className={style.postActions}>
                        <div className={style.likeBlock}>
                            {liked ? <FavoriteIcon cursor='pointer'
                                                   fontSize='small'
                                                   onClick={() => likeHandler(unLikePostThunk, post._id)}
                                />
                                : <FavoriteBorderIcon cursor='pointer'
                                                      fontSize='small'
                                                      onClick={() => likeHandler(likePostThunk, post._id)}/>
                            }
                            <span>
                                {post.likes.length}
                            </span>
                        </div>
                        <div className={style.commentsBtn}
                             onClick={() => {
                                 setShowComments(!showComments);
                                 getActivePost(post._id);
                             }}>
                            Comments
                            {showComments
                                ? <KeyboardArrowUpIcon fontSize='small' />
                                : <KeyboardArrowDownIcon fontSize='small' />

                            }
                        </div>
                    </div>
                </div>
                {isOwner && (
                    <div className={style.deleteBtn} onClick={() => deletePost(post._id, post.text)}>
                        <CloseIcon cursor='pointer'/>
                    </div>)
                }
            </div>
            {
                (activeComments  && showComments) && (
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