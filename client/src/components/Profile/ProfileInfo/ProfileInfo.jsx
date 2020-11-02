import React, {useState} from "react";
import style from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/img/usr.png"
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";
import {Skill} from "./Skill/Skill";
import ProfileData from "./ProfileData/ProfileData";
import EditIcon from '@material-ui/icons/Edit';

const ProfileInfo = props => {

    const [editMode, setEditMode] = useState(false);

    function onMainPhotoSelected(event) {
        if (event.target.files.length > 0)
            props.savePhoto(event.target.files[0]);
    }

    const onSubmit = formData => {
        // const promise = props.saveProfileData(formData);
        // promise.then(
        //     () => {
        //         setEditMode(false);
        //     }
        // );
        props.saveProfileData(formData);
    };

    const enableEditMode = () => {
        setEditMode(true)
    }

    return props.profile ? (
        <div className={style.profile}>
            <div className={style.profileImage}>
                <img
                    src="https://image.winudf.com/v2/image/Y29tLmJlYWNoLmJhbGliZWFjaHdhbGxwYXBlcl9zY3JlZW5fMF8xNTMyOTc5NTE3XzA0NQ/screen-0.jpg?fakeurl=1&type=.jpg"
                    alt=""/>
            </div>
            <div className={style.descriptionBlock}>
                <div className={style.profileImgBlock}>
                    <img src={props.profile.user.avatar || userPhoto} alt=""/>
                </div>
                <>
                    {editMode ? (
                        <ProfileDataForm
                            initialValues={props.profile}
                            profile={props.profile}
                            status={props.status}
                            aboutMe={props.aboutMe}
                            onSubmit={onSubmit}
                            setEditMode={setEditMode}
                        />
                    ) : (
                        <>
                            <>
                                <ProfileData
                                    profile={props.profile}
                                />
                            </>
                            {props.isOwner && <div className={style.editProfileBtn}>
                                <EditIcon onClick={enableEditMode} cursor={'pointer'}/>
                            </div>
                            }
                        </>
                    )
                    }
                </>
            </div>
        </div>
    ) : (
        <Preloader/>
    );
};

export default ProfileInfo;