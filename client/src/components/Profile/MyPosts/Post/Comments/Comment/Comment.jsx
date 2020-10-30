import React from "react";
import styles from "./Comment.module.css"
import CloseIcon from '@material-ui/icons/Close';

export const Comment = ({
                            comment,
                            avatar,
                            isOwner,
                            commentId,
                            getCommentId
                        }) => {


    return <div className={styles.commentBlock}>
        <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
                <img src={avatar} alt="User avatar"/>
            </div>
            <p className={styles.commentText}>{comment}</p>
        </div>
        {isOwner && (
            <span className={styles.deleteComment} onClick={() => getCommentId(commentId)}>
            <CloseIcon fontSize={'small'} cursor={'pointer'}/>
            </span>
        )
        }
    </div>
}