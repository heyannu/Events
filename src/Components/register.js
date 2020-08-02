import React, { Component } from "react";
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core'
import { BrowserRouter as Redirect } from "react-router-dom";
import firebase from "firebase"
import "./Assets/login.css"

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      // name: "",
      password: "",
      redirect: false
    }
  }
  email(e) {
    this.setState({ email: e.target.value })
    console.log(e.target.value)
  }
  // name(e) {
  //   this.setState({ name: e.target.value })
  //   console.log(e.target.value)
  // }
  password(e) {
    this.setState({ password: e.target.value })
    console.log(e.target.value)
  }

  submit(e) {
    if (this.state.name == "" || this.state.email == "" || this.state.password == "") {
      alert('Fields can not be empty!')
    }
    else {
      this.setState({
        email:'',
        password:''
      })
      e.preventDefault();
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
        this.setState({
          redirect: true
        })
      }).catch((err) => {
        console.log(err)
        alert(err.message)
       
      })

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
              <div className="title"><center><h1>REGISTER</h1></center></div>
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
                    placeholder="Password"
                    variant="outlined"
                    required
                    value={this.state.password}
                    onChange={this.password.bind(this)}
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