import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunk} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import styles from "../common/FormsControls/FormsControls.module.css"

const LoginForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} name={"email"} type={"email"} placeholder={"Login"} validate={requiredField}/>
            </div>
            <div>
                <Field component={Input} name={"password"} type={"password"} placeholder={"Password"}
                       validate={requiredField}/>
            </div>
            <div>
                <Field component={"input"} name={"rememberMe"} type={"checkbox"}/> remember me
            </div>
            {props.captchaUrl && (
                <>
                <img src={props.captchaUrl} alt="captcha"/>
                <div>
                    <Field
                        component={"input"}
                        validate={requiredField}
                        name={"captcha"}
                        type={"text"}
                        placeholder={"Enter symbols from the image"}/>
                </div>
                </>
                )}
            <div>
                <button>Login</button>
            </div>
            {
                props.error && (
                    <div className={styles.formSummaryError}>
                        {props.error}
                    </div>
                )
            }
        </form>
    )
};

const LoginReduxForm = reduxForm({form: "login"})(LoginForm);

class Login extends Component {

    onSubmit = formData => {
        // console.log(formData);
        this.props.loginThunk(formData.email, formData.password)
    };

    render() {

        const {isAuth, captchaUrl} = this.props;

        return isAuth ? (
            <Redirect to={"/"}/>
        ) : (
            <div>
                <h1>Login</h1>
                <LoginReduxForm captchaUrl={captchaUrl} onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {loginThunk})(Login);