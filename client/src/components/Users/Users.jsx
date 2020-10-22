import React from "react";
import User from "./User";

const Users = (props) => {

    const {
        users,
        followingInProgress,
        followThunk,
        unFollowThunk
    } = props

    return (
        <div>
            {users.map(user => (
                    <User
                        key={user._id}
                        user={user}
                        followingInProgress={followingInProgress}
                        followThunk={followThunk}
                        unFollowThunk={unFollowThunk}
                    />
                )
            )}
        </div>
    )

};

export default Users;