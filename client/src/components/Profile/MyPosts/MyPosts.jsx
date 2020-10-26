import React from "react";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";
import NewPost from "./NewPost/NewPostForm";

const MyPosts = (props) => {

    const postElements = [...props.posts]
        .reverse().map(post => <Post key={post._id} message={post.text}/>);

    return (
        <div className={style.postsBlock}>

            <NewPost
                addPostThunk={props.addPostThunk}
                addPost={props.addPost}
                newPostText={props.newPostText}

            />

            <div>
                <h3>My posts</h3>
                {postElements}
            </div>
        </div>
    )
};

export default MyPosts;