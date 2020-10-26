import React from "react";
import {Input, Textarea} from "../common/FormsControls/FormsControls";
import {Field, reduxForm} from "redux-form";
import {requiredField} from "../../utils/validators/validators";
import styles from "../common/FormsControls/FormsControls.module.css";

const ProfileDataForm = ({handleSubmit, profile, error, setEditMode}) => {
    return (
        <form onSubmit={handleSubmit}>
            {
                error && (
                    <div className={styles.formSummaryError}>
                        {error}
                    </div>
                )
            }
            <div>
                <p>Status:</p>
                <Field
                    component={Input}
                    name={"status"}
                    placeholder={"Status"}
                />
            </div>
            <div>
                <p>City:</p>
                <Field
                    component={Input}
                    name={"location.city"}
                    placeholder={"City"}
                />
            </div>
            <div>
                <p>Country:</p>
                <Field
                    component={Input}
                    name={"location.country"}
                    placeholder={"Country"}
                />
            </div>
            <h3>Skills</h3>
            <h3>Contacts</h3>
            <ContactForm title={'Facebook'} data={profile.contacts.facebook} name={"contacts.facebook"}/>
            <ContactForm title={'GitHub'} data={profile.contacts.github} name={"contacts.github"}/>
            <ContactForm title={'Instagram'} data={profile.contacts.instagram} name={"contacts.instagram"}/>
            <ContactForm title={'Twitter'} data={profile.contacts.twitter} name={"contacts.twitter"}/>
            <button>SAVE</button>
            <span onClick={()=>setEditMode(false)}>Close form [X]</span>
        </form>
    )
}

const ContactForm = ({title, data, name}) => {
    return (
        <div>
            <p>{title}: {data}</p>
            <Field
                component={Input}
                name={name}
                placeholder={"Contact link..."}
            />
        </div>
    )
}

const ProfileReduxForm = reduxForm({form: "profile-edit"})(ProfileDataForm);

export default ProfileReduxForm;