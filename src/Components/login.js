import React, { Component } from "react";
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import { Redirect, Link } from "react-router-dom";
import firebase from "firebase"
import swal from "sweetalert"
import "./Assets/css/login.css"

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
  }
  password(e) {
    this.setState({ password: e.target.value })
  }
  submit(e) {
    if (e.key == 'Enter' || e.type == 'click') {
      e.preventDefault();
      if (this.state.password === "" || this.state.email === '') {
        swal({
          title: 'Fields Cannot Be Empty',
          icon: 'warning',
          button: 'OK'
      });
      }
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
        this.setState({
          redirect: true,
          email: "",
          password: ""
        })
        swal({
          title: "Login Successful",
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
  render() {
    if (this.state.redirect === true) {
      return <Redirect to={{
        pathname: '/',
        state: {
          message: 'Login Successful!'
        }
      }} />
    }
    else {
      return (
        <div className="login">
          <div>
            <Container class="layer">
              <div className="title"><center><h1>LOGIN</h1></center></div>
              {/* <p>counter</p> */}

              <Container>
                <div className="pos">
                  {/* <center> */}
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
                    value={this.state.password}
                    placeholder="Password"
                    variant="outlined"
                    required
                    type="Password"
                    onChange={this.password.bind(this)}
                    className="text" />

                </div>
                <div >
                  <center>
                    <Button class="button1" variant="contained" color="primary" className="button" onClick={this.submit.bind(this)}>Login</Button>
                  </center>
                </div>
                <div className="link1">
                  <center><p>New User? <Link to={{ pathname: '/register' }}> Create an Account </Link> </p></center>
                </div>
              </Container>
            </Container>
          </div>
        </div>
      );
    }
  }
}
