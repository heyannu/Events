import React, { Component } from "react";
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core'
import { BrowserRouter as Redirect } from "react-router-dom";
import firebase from "firebase"
import swal from "sweetalert"

import "./Assets/css/login.css"

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      redirect: false,
      cpassword:''
    }
  }
  email(e) {
    this.setState({ email: e.target.value })
  }
  name(e) {
    this.setState({ name: e.target.value })
  }
  password(e) {
    this.setState({ password: e.target.value })
  }
  cpassword(e) {
    this.setState({ cpassword: e.target.value })
  }
  submit(e) {
    if (e.key == 'Enter' || e.type == 'click') {
      if (this.state.name === "" || this.state.email === "" || this.state.password === "") {
        swal('Fields can not be empty!')
      }
      else if(this.state.password != this.state.cpassword){
        swal('Passwords do not match');
      }
      else {
        this.setState({
          email: '',
          password: '',
          cpassword: ''
        })
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
          var user1 = firebase.auth().currentUser;
          if (user) {
            user1.updateProfile({
              displayName: this.state.name,
            })
          }
          this.setState({
            redirect: true,
            name: ''
          })
          swal({
            title: "User Created",
            icon: "success",
            button: "OK",
          })
        }).catch((err) => {
          swal({
            title: err.message,
            icon: "error",
            button: "OK",
          })
        })
      }
    }
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to={{
        pathname: '/'
      }} />
    }
    else {
      return (
        <div className="login">
          <div>
            <Container class="layer">
              <div className="title"><center><h1 id="regTitle">REGISTER</h1></center></div>
              <Container>
                <div className="pos">
                  <TextField
                    id="Name"
                    placeholder="Name"
                    variant="outlined"
                    required
                    value={this.state.name}
                    onChange={this.name.bind(this)}
                    className="text"
                  />

                </div>
                <div className="pos">
                  <TextField
                    id="Email"
                    placeholder="Email"
                    variant="outlined"
                    required
                    value={this.state.email}
                    onChange={this.email.bind(this)}
                    className="text"
                  />

                </div>
                <div className="pos">
                  <TextField
                    id="Password"
                    placeholder="Password"
                    variant="outlined"
                    required
                    type="Password"
                    value={this.state.password}
                    onChange={this.password.bind(this)}
                    className="text" />
                </div>
                <div className="pos">
                  <TextField
                    id="ConfirmPassword"
                    placeholder="Confirm Password"
                    variant="outlined"
                    required
                    type="Password"
                    value={this.state.cpassword}
                    onChange={this.cpassword.bind(this)}
                    className="text" />
                </div>
                <div >
                  <center>
                    <Button class="button1" variant="contained" color="primary" className="button" onClick={this.submit.bind(this)}>Register</Button>
                  </center>
                </div>
                <div className="link">
                  <center><p>Already an User?<a href="/"> Sign In Now</a></p></center>
                </div>
              </Container>
            </Container>
          </div>
        </div>);
    }
  }
}