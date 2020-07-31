import React, { Component } from 'react';
import Navbar from './navbar'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import firebase from './firebase'
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
        var date = new Date(e.target.value)
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        var d = (day+"-"+month+"-"+year)
        this.setState({ date: d })
    
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
            const eventRecord = { name: this.state.name, date: this.state.date, event: this.state.event, signature: this.state.signature }
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
                                <Select
                                    labelId="Event"
                                    placeholder="Event"
                                    id="Event"
                                    required
                                    variant="outlined"
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
                                    id="RName"
                                    placeholder="Reciever's Name"
                                    variant="outlined"
                                    required
                                    onChange={this.name.bind(this)}
                                />
                            </center>
                        </div>
                        
                        <div className="position">
                            <center>
                                <TextField
                                    id="date"
                                    onChange={this.date.bind(this)}
                                    type="date"
                                    variant="outlined"
                                    required
                                    
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
                                
                                />
                            </center>
                        </div>
                        <div >
                            <Button variant="contained" class="button" onClick={this.submit.bind(this)}>
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
