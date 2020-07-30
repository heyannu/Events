import React, { Component } from "react";
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Container} from '@material-ui/core'
import { BrowserRouter as Redirect } from "react-router-dom";
import firebase from "firebase"
import "./Assets/login.css"

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
    if (this.state.redirect === true) {
      return <Redirect to={{
        pathname: '/login',
        state: {
          message: 'Registration Successful!'
        }
      }} />
    }
    else {
      return (
        <div className="container">
          <div>
            <Container maxWidth="sm">
              <center><h1>Register</h1></center>
              <Container maxWidth="sm">
                <div className="position">
                  <center>
                    <TextField
                      id="Email"
                      placeholder="Email"
                      variant="outlined"
                      required
                      onChange={this.email.bind(this)}
                      className="text"
                    />
                    <TextField
                      id="Password"
                      placeholder="Password"
                      variant="outlined"
                      required
                      onChange={this.password.bind(this)}
                      className="text" />
                  </center>
                </div>
                <div >
                  <center>
                    <Button className="button" variant="contained" color="primary" className="button" onClick={this.submit.bind(this)}>ADD</Button>
                  </center>
                </div>
              </Container>
            </Container>
          </div>
        </div>
           );
    }
  }
}