import React, {Component} from "react";
import {connect} from "react-redux";
import {
    setCurrentPage, unFollowThunk,
    getUsersThunk, followThunk
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import styles from "./Users.module.css";
import Pagination from "./Pagination";
import {compose} from "redux";
//import WithAuthRedirect from "../../hoc/WithAuthRedirect";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers, getUserSuperSelector
} from "../../redux/selectors/usersSelectors";

class UsersContainer extends Component {

    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
    }

    setCurrentPage = (page) => {

        this.props.setCurrentPage(page);

        this.props.getUsersThunk(page, this.props.pageSize);
    };

    render() {

        return <div className={styles.usersBlock}>
            <Pagination
                totalItemsCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                setCurrentPage={this.setCurrentPage}
            />
            {
                this.props.isFetching
                    ? <Preloader/>
                    : <Users
                        users={this.props.users}
                        followingInProgress={this.props.followingInProgress}
                        followThunk={this.props.followThunk}
                        unFollowThunk={this.props.unFollowThunk}
                    />
            }
        </div>
    }
}


const mapStateToProps = (state) => {
    return {
        users: getUserSuperSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};

export default compose(
    connect(mapStateToProps, {
    setCurrentPage,
    getUsersThunk,
    followThunk, unFollowThunk
}))(UsersContainer);

