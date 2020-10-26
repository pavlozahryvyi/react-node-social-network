import React from "react";
import {Skill} from "../Skill/Skill";

const ProfileData = ({profile}) => {
    return (
        <div>
            <p>Name: {profile.user.name}</p>
            <p>City: {profile.location.city}</p>
            <p>Country: {profile.location.country}</p>
            <p>Status: {profile.status}</p>
            <p>Skills:</p>
            {profile.skills.map((skill, index) => (
                <Skill key={index + 'skill'} skill={skill} />
            ))}
        </div>
    )
}

export default ProfileData;