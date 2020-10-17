import React from "react";
import {addMessage} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import WithAuthRedirect from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
};

const DialogsContainer = compose(
    WithAuthRedirect,
    connect(mapStateToProps, {addMessage})
)(Dialogs);

export default DialogsContainer;