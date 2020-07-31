import React, { Component } from "react";
import Navbar from "./navbar"
import firebase from "firebase"
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events:[],
      annimessage:[],
      bdaymessage:[]
    }
  }

  async componentDidMount() {
    const db = firebase.firestore()
    const snapshot = await db.collection('eventRecord').get()
    snapshot.forEach((doc) => {
      this.state.events.push(doc.data().eventRecord);
    })
    const snapshot1 = await db.collection('anniMessages').get()
    snapshot1.forEach((doc) => {
      this.state.annimessage.push(doc.data())
    })
    const snapshot2 = await db.collection('bdayMessages').get()
    snapshot2.forEach((doc) => {
      this.state.bdaymessage.push(doc.data())
    })
    this.setState({
      users: this.state.users,
      annimessage: this.state.annimessage,
      bdaymessage: this.state.bdaymessage
    })
    
    fetch('http://localhost:8080/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          events: this.state.events,
          bday:this.state.bdaymessage,
          anni:this.state.annimessage          
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
        })

        .catch((error) => {
          console.error(error);
        });
      }

render() {
  return (
    <div>
      <Navbar />
      <h1>Hello World!</h1>
    </div >
  )
}
}
