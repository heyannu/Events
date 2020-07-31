import React, { Component} from 'react';
import firebase from './Components/firebase';
import Login from './Components/login'
import Register from './Components/register'
import Home from './Components/home'
import AddEvent from './Components/addEvent'
import ViewEvent from './Components/viewEvent'

import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  constructor(props)
  {
      super(props);
      this.state ={
          user:"", 
          isLogged:false
      }
  }
 componentDidMount(){
    this.authListener();

 }
 authListener(){
     firebase.auth().onAuthStateChanged((user)=>{
         if(user){
             this.setState({user:user, isLogged:true})
             console.log("loggedin")
         }
         else{
             this.setState({user:null, isLogged:false})
             console.log("notloggedin")

         }
     })
 }

 render() {
  if(this.state.isLogged){
      return (
        <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/addEvent' component={AddEvent} />
        <Route exact path='/viewEvent' component={ViewEvent} />
        </Router>
      )
  }
  else{
    return (
   <Router>
    <Route exact path="/register" component={Register} />
    <Route exact path="/" component={Login} />  
    </Router>
  ) }

}
}
