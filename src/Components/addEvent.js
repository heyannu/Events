import React, { Component } from 'react';
import Navbar from './navbar'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import firebase from './firebase'
import { FormControlLabel } from '@material-ui/core';
import { Switch } from '@material-ui/core';
import './Assets/styles.css'

import Button from '@material-ui/core/Button';


export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: '',
            event: '',
            signature: '',
        }
    }

    name(e) {
        this.setState({ name: e.target.value })
    }
    date(e) {
        this.setState({ date: e.target.value })
    }
    event(e) {
        this.setState({ event: e.target.value })
    }
    signature(e) {
        this.setState({ signature: e.target.value })
    }
    submit(e) {
        console.log(this.state)
        const st = this.state;
        if (st.name == "" || st.event == "" || st.date == "" || st.signature == "") {
            alert("Fields cannot be empty");
        }
        else {
            const eventRecord = { name: this.state.name, date: this.state.date, event: this.state.event, signature: this.state.signature}
            const db = firebase.firestore()
            db.collection('eventRecord').add({ eventRecord: eventRecord }).then(() => {
                console.log("created")
            })
        }
    }
    render() {
        return (
            <div className="container">
                <Navbar />
                <div>
                    <Container maxWidth="sm">
                        <center><h1>Add Event</h1></center>
                        <Container maxWidth="sm">
                            <div className="position">
                                <center>
                                    <TextField
                                        id="Name"
                                        placeholder="Reciever's Name"
                                        variant="outlined"
                                        required
                                        onChange={this.name.bind(this)}
                                        className="text"
                                    />
                                </center>
                            </div>
                            <div className="position">
                                <center>
                                    <Select
                                        labelId="Event"
                                        label="Event"
                                        id="Event"
                                        required
                                        variant="outlined"
                                        className="text"
                                        onChange={this.event.bind(this)}
                                        value={this.state.event}
                                    >
                                        <option value="Birthday">Birthday</option>
                                        <option value="Anniversary">Anniversary</option>
                                    </Select>
                                </center>
                            </div>
                            <div className="position">
                                <center>
                                    <TextField
                                        id="date"
                                        onChange={this.date.bind(this)}
                                        // label="Birthday"
                                        type="date"
                                        variant="outlined"
                                        required
                                        className="text"
                                    />
                                </center>
                            </div>
                            <div className="position">
                                <center>
                                    <TextField
                                        id="Name"
                                        placeholder="Signature"
                                        variant="outlined"
                                        required
                                        onChange={this.signature.bind(this)}
                                        className="text"
                                    />
                                </center>
                            </div>
                            
                            {/* <div className="position">
                                <center>
                                    <FormControlLabel
                                        value="start"
                                        control={<Switch color="primary" />}
                                        label="Start"
                                        labelPlacement="start"
                                        className="input"
                                    /> 
                                </center>
                            </div> */}

                            <div >
                                <Button variant="contained" color="primary" className="button" onClick={this.submit.bind(this)}>
                                    ADD
                                </Button>
                            </div>
                        </Container>
                    </Container>
                </div>
            </div>
        );
    }
}
