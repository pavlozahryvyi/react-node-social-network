import React from "react";
import {Input} from "../../../common/FormsControls/FormsControls";
import {Field, reduxForm} from "redux-form";
import stylesForm from "./ProfileDataForm.module.css"
import styles from "../../../common/FormsControls/FormsControls.module.css";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const ProfileDataForm = ({handleSubmit, profile, error, setEditMode}) => {
    return (
        <form onSubmit={handleSubmit} className={stylesForm.formBlock}>
            <div className={stylesForm.formData}>
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
            </div>
            <div className={stylesForm.formContacts}>
                <h3>Contacts</h3>
                <ContactForm title={'Facebook'} data={profile.contacts.facebook} name={"contacts.facebook"}/>
                <ContactForm title={'GitHub'} data={profile.contacts.github} name={"contacts.github"}/>
                <ContactForm title={'Instagram'} data={profile.contacts.instagram} name={"contacts.instagram"}/>
                <ContactForm title={'Twitter'} data={profile.contacts.twitter} name={"contacts.twitter"}/>
            </div>
            <div>
                <div>
                    <button><CheckCircleOutlineIcon cursor={'pointer'}/></button>
                </div>
                <div>
                    <HighlightOffIcon
                        cursor={'pointer'}
                        onClick={() => setEditMode(false)}/>
                </div>
            </div>

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