import React, {Component} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileThunk,
    getUserStatus,
    updateStatus,
    savePhoto,
    saveProfileData,
    getPostsThunk, likePostThunk
} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import WithAuthRedirect from "../../hoc/WithAuthRedirect";
import Preloader from "../common/Preloader/Preloader";

class ProfileContainer extends Component {

    refreshProfile = () => {
        const userId = this.props.match.params.userId || null;
        this.props.getProfileThunk(userId);
        this.props.getPostsThunk(userId);
        console.log(this.props.myId)
        /*console.log("---userId", userId);
        if (userId) {
            this.props.getProfileThunk(userId);
        }else {
            this.props.getProfileThunk();
        }*/
    };

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        const {isLoading} = this.props;
        return isLoading ? (
            <Preloader/>) : (
            <Profile
                userId={this.props.match.params.userId}
                isOwner={!this.props.match.params.userId}
                {...this.props}
                profile={this.props.profile}
                saveProfileData={this.props.saveProfileData}
            />
        );
    }

}

const mapStateToProps = (state) => ({
    myId: state.auth._id,
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isLoading: state.profilePage.isLoading
});


export default compose(
    withRouter,
    connect(mapStateToProps,
        {
            getProfileThunk,
            getUserStatus,
            updateStatus,
            savePhoto,
            saveProfileData,
            getPostsThunk,

        })
)(ProfileContainer);