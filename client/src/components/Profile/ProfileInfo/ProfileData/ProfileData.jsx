import React from "react";
import {Skill} from "../Skill/Skill";
import styles from "./ProfileData.module.css"

const ProfileData = ({profile}) => {
    return (
        <div className={styles.profileData}>
            <div className={styles.profileInfo}>
                <p>Name: <span>{profile.user.name}</span></p>
                <p>City: <span>{profile.location.city}</span></p>
                <p>Country: <span>{profile.location.country}</span></p>
                <p>Status:</p>
                <p><span>{profile.status}</span></p>
                <p>Skills: </p><br/>
                {profile.skills.map((skill, index) => (
                    <Skill key={index + 'skill'} skill={skill}/>
                ))}
            </div>
            <div className={styles.profileContacts}>
                <h3>Contacts:</h3>
                <Contact title={'Facebook'} data={profile.contacts.facebook}/>
                <Contact title={'GitHub'} data={profile.contacts.github}/>
                <Contact title={'Instagram'} data={profile.contacts.instagram}/>
                <Contact title={'Twitter'} data={profile.contacts.twitter}/>
            </div>
        </div>
    )
}

const Contact = ({title, data}) => (
    data ? (
        <p>
            <a href={`${data}`}>{title}</a>
        </p>
    ) : null
);

export default ProfileData;