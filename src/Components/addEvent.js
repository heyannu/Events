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


export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            date:'',
            event:''
        }
    }

    name(e) {
        this.setState({ name : e.target.value })
    }
    date(e) {
        this.setState({ date : e.target.value })
    }
    event(e) {
        this.setState({ event : e.target.value })
    }
    submit(e) {
        // console.log(this.props.location.user)
        const st = this.state;
       if(st.name=="" || st.event==""|| st.date==""){
           alert("Fields cannot be empty");
       }
       else{
        const eventRecord = {name:this.state.name, date:this.state.date, event:this.state.event}
        const db = firebase.firestore()
        db.collection('eventRecord').add({eventRecord:eventRecord}).then(()=>{
            console.log("created")
        })
       }
    }
    render() {
        return (
            <div style={styles.container}>
                <Navbar />
                <div>
                    <Container maxWidth="sm">
                        <center><h1>Add Event</h1></center>
                        <Container maxWidth="sm">
                            <div style={styles.position}>
                                <center>
                                    <TextField
                                        id="Name"
                                        placeholder="Reciever's Name"
                                        variant="outlined"
                                        required
                                        onChange={this.name.bind(this)}
                                        style={styles.text}
                                    />
                                </center>
                            </div>
                            <div style={styles.position}>
                                {/* <center> */}
                                <Select
                                    labelId="Event"
                                    label="Event"
                                    id="Event"
                                    required
                                    variant="outlined"
                                    style={styles.text}
                                    onChange={this.event.bind(this)}
                                    value={this.state.event}
                                // value={age}
                                // onChange={handleChange}
                                >
                                    <option value="Birthday">Birthday</option>
                                    <option value="Anniversary">Anniversary</option>
                                    {/* <option value={30}>Thirty</MenuItem> */}
                                </Select>
                                {/* </center> */}
                            </div>
                            <div style={styles.position}>
                                <center>
                                    <TextField
                                        id="date"
                                        onChange={this.date.bind(this)}
                                        // label="Birthday"
                                        type="date"
                                        variant="outlined"
                                        required
                                        style={styles.text}
                                    />
                                </center>
                            </div>
                            <div >
                                <Button variant="contained" color="primary" style={styles.button} onClick={this.submit.bind(this)}>
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
const styles = {
    direction: {
        width: "100vw",
        lineHeight: "1px",
        float: 'right'
    },
    container: {
        overflow: 'hidden',
        justifyContent: "center",
        margin: "18vh 14vh 14vh 19vh",
        width: "80vw",
        height: "70vh",
        background: "rgba(239, 242, 192, 1)"
        // background:"url(../../Assets/images/1.jpg)"
    },
    position: {
        display: "flex",
        flexDirection: "row"
    },
    text: {
        marginTop: "2vh",
        width: "30vw"
    },
    button: {

        width: "30vw"
    }
}