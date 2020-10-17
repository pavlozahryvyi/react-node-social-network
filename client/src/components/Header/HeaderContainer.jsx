import React, {Component} from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logoutThunk} from "../../redux/authReducer";

class HeaderContainer extends Component {
    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => (
    {
        name: state.auth.name,
        isAuth: state.auth.isAuth
    }
);

export default connect(mapStateToProps, {logoutThunk})(HeaderContainer);