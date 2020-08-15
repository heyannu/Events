import React, { Component } from 'react';
import firebase from './Components/firebase';
import Login from './Components/login'
import Register from './Components/register'
import Home from './Components/home'
import AddMeeting from './Components/addMeeting'
import AddEvent from './Components/addEvent'
import ViewEvent from './Components/viewEvent'
import ViewMeeting from './Components/viewMeeting'
import UsersNotFound from './Components/usersNotFound'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            isLogged: false
        }
    }
    componentDidMount() {
        this.authListener();
    }
    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user, isLogged: true })
                console.log(this.state.isLogged)
            }
            else {
                this.setState({ user: null, isLogged: false })
                console.log(this.state.isLogged)
            }
        })
    }

    render() {
        const logged = this.state.isLogged
        return (
            <Router>
                <Switch>
                    <Route exact path='/'>
                        {
                            !logged ? <Login /> : <Home user={this.state.user} />
                        }
                    </Route>
                    <Route exact path="/register">
                        <Register/>
                    </Route>
                    <Route exact path='/addEvent' >
                        {
                            !logged ? <Login /> : <AddEvent user={this.state.user} />
                        }
                    </Route>
                    <Route exact path='/viewEvent' >
                        {
                            !logged ? <Login /> : <ViewEvent user={this.state.user} />
                        }
                    </Route>
                    <Route exact path='/addMeeting'>
                        {
                            !logged ? <Login /> : <AddMeeting user={this.state.user} />
                        }

                    </Route>

                    <Route exact path='/viewMeeting'>
                        {
                            !logged ? <Login /> : <ViewMeeting user={this.state.user} />
                        }
                    </Route>
                    <Route component={UsersNotFound} />
                </Switch>
            </Router>
        )

    }
}
