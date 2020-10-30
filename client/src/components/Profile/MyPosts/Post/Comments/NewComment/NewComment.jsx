import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../../../../common/FormsControls/FormsControls";
import {requiredField} from "../../../../../../utils/validators/validators";
import styles from "./NewComment.module.css"
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';

const newCommentForm = props => {
    return <form onSubmit={props.handleSubmit}>
        <div className={styles.addCommentBlock}>
            <div className={styles.addCommentInput}>
                <Field component={Input} name={"text"} type={"text"} placeholder={"Add ypu comment"}/>
            </div>
            <div className={styles.addCommentBtn}>
                <button><AddIcon/></button>
            </div>
        </div>
    </form>
}

const NewCommentReduxForm = reduxForm({form: "comment"})(newCommentForm);

const NewComment = props => {

    function onSubmit(formData) {
        props.getCommentText(formData);
    }

    return <div>
        <NewCommentReduxForm onSubmit={onSubmit}/>
    </div>
}

export default connect(
    withRouter
)(NewComment)