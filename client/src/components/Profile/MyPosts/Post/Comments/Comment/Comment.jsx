import React from "react";
import styles from "./Comment.module.css"

export const Comment = ({
                            comment,
                            avatar,
                            userId,
                            commentId
                        }) => {

    function getCommentId(id){
        console.log('---comment id', id)
    }

    return <div className={styles.commentBlock}>
        <div className={styles.userAvatar}>
            <img src={avatar} alt="User avatar"/>
        </div>
        <p className={styles.commentText}>{comment}</p>
        <span className={styles.deleteComment} onClick={()=>getCommentId(commentId)}>[X]</span>
    </div>
}