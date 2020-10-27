import React from "react";
import styles from "./Comment.module.css"

export const Comment = ({
                            comment,
                            avatar,
                            isOwner,
                            commentId,
                            getCommentId
                        }) => {


    return <div className={styles.commentBlock}>
        <div className={styles.userAvatar}>
            <img src={avatar} alt="User avatar"/>
        </div>
        <p className={styles.commentText}>{comment}</p>
        {isOwner &&
            <span className={styles.deleteComment} onClick={() => getCommentId(commentId)}>[X]</span>
        }
    </div>
}