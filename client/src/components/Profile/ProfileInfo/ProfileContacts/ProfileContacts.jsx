import React from "react";

export const ProfileContacts = ({profile}) => (
    <div>
        <h3>Contacts:</h3>
        <Contact title={'Facebook'} data={profile.contacts.facebook}/>
        <Contact title={'GitHub'} data={profile.contacts.github}/>
        <Contact title={'Instagram'} data={profile.contacts.instagram}/>
        <Contact title={'Twitter'} data={profile.contacts.twitter}/>
    </div>
)

const Contact = ({title, data}) => (
    data ? (
        <p>
            <a href={`${data}`}>{title}</a>
        </p>
    ) : null
);