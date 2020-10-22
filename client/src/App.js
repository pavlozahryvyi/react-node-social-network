import React, {Component, Suspense} from 'react';
import {Redirect, Switch, BrowserRouter, Route, withRouter} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import WithSuspense from "./hoc/WithSuspense";
import store from "./redux/redux-store";
import {getUserThunk} from "./redux/authReducer";
import Registration from "./components/Registration/Registration";

//lazy loading
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));

class App extends Component {

    componentDidMount() {
       this.props.getUserThunk();
    }

    render() {
        return <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-block'>
                    <div className="app-wrapper-content">
                        <Switch>
                            <Route path='/login' render={() => <Login/>}/>
                            <Route path='/registration' render={() => <Registration/>}/>
                            <Route path={'/profile/:userId'} render={() => <ProfileContainer/>} exact/>
                            <Route path={'/'} render={() => <ProfileContainer/>} exact/>
                            <Route path='/dialogs' render={WithSuspense(DialogsContainer)}/>
                            <Route path='/users' render={() => <UsersContainer/>}/>
                            <Route path='/news' render={WithSuspense(News)}/>
                            <Route path='/music' render={WithSuspense(Music)}/>
                            <Route path='/settings' render={WithSuspense(Settings)}/>
                            <Route path={`*`} render={() => <div>ERROR, PAGE NOT FOUND, 404</div>}/>
                        </Switch>
                    </div>
                </div>
            </div>

    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
};

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp, getUserThunk}))
(App);

const SamuraiNetwork = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default SamuraiNetwork;
