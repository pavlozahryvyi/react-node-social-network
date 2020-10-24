import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunk, registrationThunk} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import styles from "../common/FormsControls/FormsControls.module.css"
import loginStyles from "./style.module.css"

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

const RegistrationForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} name={"name"} type={"text"} placeholder={"Name"}
                       validate={requiredField}/>
            </div>
            <div>
                <Field component={Input} name={"email"} type={"email"} placeholder={"Login"}
                       validate={requiredField}/>
            </div>
            <div>
                <Field component={Input} name={"password"} type={"password"} placeholder={"Password"}
                       validate={requiredField}/>
            </div>
            <p>Profile settings</p>
            <div>
                <Field component={Input} name={"status"} type={"text"} placeholder={"Status"}
                       validate={requiredField}/>
            </div>
            <div>
                <Field component={Input} name={"city"} type={"text"} placeholder={"City"}
                       validate={requiredField}/>
            </div>
            <div>
                <Field component={Input} name={"country"} type={"text"} placeholder={"Country"}
                       validate={requiredField}/>
            </div>
            <div>
                <Field component={Input} name={"skills"} type={"text"} placeholder={"Skills"}
                       validate={requiredField}/>
            </div>
            <div>
                <Field component={Input} name={"facebook"} type={"text"} placeholder={"Facebook"}
                       validate={requiredField}/>
            </div>
            <div>
                <Field component={Input} name={"instagram"} type={"text"} placeholder={"Instagram"}
                       validate={requiredField}/>
            </div>
            <div>
                <Field component={Input} name={"twitter"} type={"text"} placeholder={"Twitter"}
                       validate={requiredField}/>
            </div>
            <div>
                <Field component={Input} name={"github"} type={"text"} placeholder={"Github"}
                       validate={requiredField}/>
            </div>
            <div>
                <Field component={Input} name={"wrapperPhoto"} type={"text"} placeholder={"Wrapper photo"}
                       validate={requiredField}/>
            </div>
            <div>
                <button>Registration</button>
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
}

const RegistrationReduxForm = reduxForm({form: "registration"})(RegistrationForm);
const LoginReduxForm = reduxForm({form: "login"})(LoginForm);

class Login extends Component {

    onSubmit = formData => {
        console.log(formData);
        console.log(Object.keys(formData).length);
        if(Object.keys(formData).length === 2){
            this.props.loginThunk(formData);
        }else {
            console.log('---registration');
            this.props.registrationThunk(formData);
        }
    };

    render() {

        const {isAuth, captchaUrl} = this.props;

        return isAuth ? (
            <Redirect to={"/"}/>
        ) : (
            <div className={loginStyles.container}>
                <div className={loginStyles.block}>
                    <h1>Login</h1>
                    <LoginReduxForm onSubmit={this.onSubmit}/>
                </div>
                <div className={loginStyles.block}>
                    <h1>Registration</h1>
                    <RegistrationReduxForm captchaUrl={captchaUrl} onSubmit={this.onSubmit}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {loginThunk, registrationThunk})(Login);