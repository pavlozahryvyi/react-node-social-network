import React from "react";
import styles from "./Users.module.css"
import userPhoto from "../../../src/assets/img/usr.png"
import {NavLink} from "react-router-dom";

const User = (props) => {

    const {
        user,
    } = props;
    console.log('---user props', user);

    return (
        <div>
            <div>
                <NavLink to={`/profile/${user.user._id}`}>
                    <img
                        src={user.user.avatar || userPhoto}
                        alt=""
                        className={styles.userPhoto}/>
                </NavLink>
            </div>
            <div>Name: {user.user.name}</div>
            {
                (user.location.city && user.location.country) && (
                    <>
                        <div>City - {user.location.city}</div>
                        <div>Country - {user.location.country}</div>
                    </>
                )
            }

        </div>
    )

};

export default User;