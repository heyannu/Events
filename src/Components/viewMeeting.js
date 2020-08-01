import React, { Component } from 'react';
import Navbar from './navbar'
import Container from '@material-ui/core/Container';
import firebase from './firebase'
import { Radio } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Divider } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import './Assets/styles.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import loader from './Assets/images/loader.gif'

export default class ViewEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meeting: [],
            ope:true,
            loading: true,
            selectedValue: "All",
            type: ''
        }
    }

    duplicate(e) {
        var temp = []
        for (var i in e)
            if (temp.indexOf(e[i]) === -1) {
                temp.push(e[i]);
            };
        return temp;
    }

    compare(a, b) {
        const A = a.date;
        const B = b.date;

        let comparison = 0;
        if (A > B) {
            comparison = 1;
        } else if (A < B) {
            comparison = -1;
        }
        return comparison;
    }

    async componentWillMount() {
        const db = firebase.firestore()
        const snapshot = await db.collection('meeting').get()
        snapshot.forEach((doc) => {
            this.state.meeting.push(doc.data().eventRecord);
            this.setState({
                meeting: this.state.meeting,
                open: false
            })
            this.state.meeting.sort(this.compare)
        });
    }


    render() {
        return (
            <div className="container1">
                <Navbar />
                <Dialog
                    open={this.state.open}
                >
                    <Grid container justify='center' style={{ marginTop: 10 }}>
                    </Grid>
                    <DialogActions>
                        {/* <p>count</p> */}
                        <img src={loader}></img>
                    </DialogActions>
                </Dialog>
                <div className="radio">
                    <Container>
                        <center><h1>View Meetings</h1></center>
                        <Divider style={{ backgroundColor: "#fff", width: "85%", margin: "0vh 10vh" }} />
                        <Grid className="space">
                            {this.state.meeting.map((e, index) =>
                                <Grid container spacing={3} id="li">
                                    <Grid item xs={3}>
                                        <li>{e.name}</li>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <li>{e.date}</li>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <li>{e.time}</li>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <li>{e.location}</li>
                                    </Grid>

                                </Grid>
                            )}
                        </Grid>
                    </Container>
                </div>
            </div>
        );
    }
}