import React, {Component} from "react";
import style from "./NewPost.module.css";
import sendImg from "./../../../../img/add.png"
import {Field, reduxForm} from "redux-form";
import {maxLength15, requiredField} from "../../../../utils/validators/validators";
import {Textarea} from "../../../common/FormsControls/FormsControls";

const NEW_POST = "newPost";

const NewPostForm = props => {
    return (
        <form onSubmit={props.handleSubmit} className={style.newPostCreationBlock}>
            <div className={style.textareaBlock}>
                <Field
                    className={style.text}
                    component={Textarea}
                    name={"text"}
                    type={"text"}
                    placeholder={"New post"}
                    validate={[requiredField, maxLength15]}
                />
            </div>
            <div className={style.buttonBlock}>
                <button>
                    <img alt={'send'} src={sendImg}/>
                    <div>Publish</div>
                </button>
            </div>
        </form>
    )
};

const NewPostReduxForm = reduxForm({form: NEW_POST})(NewPostForm);

class NewPost extends Component{

    render() {

        const onSubmit = data => {
            console.log(data);
            this.props.addPostThunk(data)
        };

        return (
            <div className={style.newPostBlock}>
                <h3>New post</h3>
                <div>
                    <NewPostReduxForm  onSubmit={onSubmit}/>
                </div>
            </div>
        )
    }
}

export default NewPost;