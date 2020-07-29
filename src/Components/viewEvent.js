import React, { Component } from 'react';
import Navbar from './navbar'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import firebase from './firebase'
import { FormControl } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';

import Button from '@material-ui/core/Button';


export default class ViewEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    async componentDidMount() {
        const db = firebase.firestore()
        const snapshot = await db.collection('eventRecord').get()
        snapshot.forEach((doc) => {
            this.state.events.push(doc.data().eventRecord)
        });
        for (var i in this.state.events) {
            console.log(this.state.events[i])
        }
    }
    render() {
        return (
            <div style={styles.container}>
                {/* <Navbar /> */}
                <div>
                    <Container maxWidth="sm">
                            {this.state.event.map((e, index) =>
                                <p key={index}>{e.name}</p>
                            )}
                        <h2>hi</h2>
                    </Container>
                </div>
            </div>
        );
    }
}
const styles = {
    ul: {
        marginTop: "5em"
    }
}