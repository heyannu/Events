import React, { Component } from "react";
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import firebase from "firebase"
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false
    }
  }
  email(e) {
    this.setState({ email: e.target.value })
    console.log(e.target.value)
  }
  password(e) {
    this.setState({ password: e.target.value })
    console.log(e.target.value)
  }
  submit(e) {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
      this.setState({
        redirect: true
      })
    }).catch((err) => {
      console.log(err)
    })

  }

  render() {
    if (this.state.redirect == true) {
      return <Redirect to={{
        pathname: '/login',
        state: {
          message: 'Registration Successful!'
        }
      }} />
    }
    else {
      return (
        <div>
          <TextField
            id="standard--input"
            label="Email"
            type="email"
            onChange={this.email.bind(this)}
            autoComplete="current-email"
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={this.password.bind(this)}
          />
          <Button variant="contained" color="secondary" onClick={this.submit.bind(this)}>
            Secondary
          </Button>
        </div>
      );
    }
  }
}