// eslint-disable-next-line
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AppHeader from "../common/AppHeader";
import Home from "../home/Home";
import Login from "../user/login/Login";
import Signup from "../user/signup/Signup";
import Profile from "../user/profile/Profile";
import Findpw from "../user/findpw/FindPassword";
import MapConponent from "../user/spot/Spot";
import OAuth2RedirectHandler from "../user/oauth2/OAuth2RedirectHandler";
import NotFound from "../common/NotFound";
import LoadingIndicator from "../common/LoadingIndicator";
import { getCurrentUser } from "../util/APIUtils";
import { ACCESS_TOKEN } from "../constants";
import PrivateRoute from "../common/PrivateRoute";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "./App.css";
import ListBoardComponent from "../user/comunity/ListBoardComponent";
import CreateBoardComponent from "../user/comunity/CreateBoardComponent";
import ReadBoardComponent from "../user/comunity/ReadBoardComponent";
import ReadBakeryComponent from "../user/Bakery/ReadBakeryComponent";

import ListQnaComponent from "../user/qna/ListQnaComponent";
import CreateQnaComponent from "../user/qna/CreateQnaComponent";
import ReadQnaComponent from "../user/qna/ReadQnaComponent";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: true,
        };

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    loadCurrentlyLoggedInUser() {
        getCurrentUser()
            .then((response) => {
                this.setState({
                    currentUser: response,
                    authenticated: true,
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                });
            });
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            authenticated: false,
            currentUser: null,
        });
        Alert.success("You're safely logged out!");
        window.location = "/login";
    }

    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
    }

    render() {
        if (this.state.loading) {
            return <LoadingIndicator />;
        }

        return (
            <div className="app">
                <div className="app-top-box">
                    <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
                </div>
                <div className="app-body">
                    <Switch>
                        <Route
                            path="/qna"
                            render={(props) => {
                                if (this.state.authenticated) {
                                    return <ListQnaComponent currentUser={this.state.currentUser} {...props} />;
                                } else {
                                    return <Redirect to="/login" />;
                                }
                            }}
                        />
                        <Route path="/create-qna/:no" component={CreateQnaComponent}></Route>
                        <Route path="/read-qna/:no" component={ReadQnaComponent}></Route>

                        <Route
                            path="/comunity"
                            render={(props) => {
                                if (this.state.authenticated) {
                                    return <ListBoardComponent currentUser={this.state.currentUser} {...props} />;
                                } else {
                                    return <Redirect to="/login" />;
                                }
                            }}
                        />
                        <Route
                            path="/read-bakery/:id"
                            render={(props) => {
                                if (this.state.authenticated) {
                                    return <ReadBakeryComponent currentUser={this.state.currentUser} {...props} />;
                                } else {
                                    return <Redirect to="/login" />;
                                }
                            }}
                        />

                        <Route path="/create-comunity/:no" component={CreateBoardComponent}></Route>
                        <Route path="/read-comunity/:no" component={ReadBoardComponent}></Route>
                        {/* <Route path="/read-bakery/:id" component={ReadBakeryComponent}></Route> */}
                        <Route exact path="/" component={Home}></Route>
                        <PrivateRoute
                            path="/profile"
                            authenticated={this.state.authenticated}
                            currentUser={this.state.currentUser}
                            handleLogout={this.handleLogout}
                            component={Profile}
                        ></PrivateRoute>
                        <Route path="/login" render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>
                        <Route path="/signup" render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
                        <Route path="/findpw" component={Findpw}></Route>
                        <Route path="/map" component={MapConponent}></Route>
                        <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
                        <Route component={NotFound}></Route>
                    </Switch>
                </div>

                <Alert stack={{ limit: 3 }} timeout={3000} position="top-right" effect="slide" offset={65} />
            </div>
        );
    }
}

export default App;
