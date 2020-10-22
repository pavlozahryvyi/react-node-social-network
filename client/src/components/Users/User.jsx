import React from "react";
import styles from "./Users.module.css"
import userPhoto from "../../../src/assets/img/usr.png"
import {NavLink} from "react-router-dom";

const Users = (props) => {

    const {
        user,
    } = props;


    return (
        <div>
            <div>
                <NavLink to={`/profile/${user.user._id}`}>
                    <img
                        src= {user.user.avatar || userPhoto}
                        alt=""
                        className={styles.userPhoto}/>
                </NavLink>
            </div>
            <div>Name: {user.user.name}</div>
            <div>City - {user.location.city}</div>
            <div>Country - {user.location.country}</div>
        </div>
    )

};

export default Users;