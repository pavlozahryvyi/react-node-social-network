import React from "react";
import styles from "./Users.module.css"
import userPhoto from "../../../src/assets/img/usr.png"
import {NavLink} from "react-router-dom";

const Users = (props) => {

    const {
        user,
        followingInProgress,
        followThunk,
        unFollowThunk
    } = props;


    const followHandler = (userId, cb) => {
        console.log(userId);
        //return cb(userId)
    }

    return (
        <div key={user.id}>
            <div>
                <NavLink to={`/profile/${user.id}`}>
                    <img
                        src= {user.photos.small !== null ? user.photos.small : userPhoto}
                        alt=""
                        className={styles.userPhoto}/>
                </NavLink>
            </div>
            <div>Name: {user.name}</div>
            <div>City - {'user.location.city'}</div>
            <div>Country - {'user.location.country'}</div>
            {user.followed
                ? (
                    <button
                        disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => followHandler(user.id, unFollowThunk)}>Unfollow</button>
                ) : (
                    <button
                        disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => followHandler(user.id, followThunk)}
                    >Follow</button>
                )
            }
        </div>
    )

};

export default Users;