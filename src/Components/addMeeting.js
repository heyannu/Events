import React, { Component } from 'react';
import Navbar from './navbar'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import firebase from './firebase'
import './Assets/styles.css'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import loader from './Assets/images/loader.gif'
import swal from 'sweetalert'

export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            day: '',
            time: '',
            month: '',
            year: '',
            location: '',
            open: true
        }
    }

    componentDidMount() {
        this.setState({ open: false })
    }
    meeting(e) {
        this.setState({ name: e.target.value })
    }
    date(e) {
        var date = new Date(e.target.value)
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        this.setState({
            day: day,
            month: month,
            year: year
        })

    }
    time(e) {
        this.setState({ time: e.target.value })
    }
    location(e) {
        this.setState({ location: e.target.value })
    }
    submit(e) {
        console.log(this.state)
        const st = this.state;
        if (st.name === "" || st.date === "" || st.time === "" || st.location === "") {
            swal("Fields cannot be empty");
        }
        else {
            const eventRecord = { name: this.state.name, day: this.state.day, month: this.state.month, year: this.state.year, time: this.state.time, location: this.state.location }
            const db = firebase.firestore()
            db.collection('meeting').add({ meetingRecord: eventRecord, uid: this.props.user.uid }).then(() => {
                swal({
                    title: 'Created',
                    icon: 'success',
                    button: 'OK'
                })
                this.setState({
                    name: "",
                    date: "",
                    time: "",
                    location: ""
                })
            })
        }
    }
    render() {
        return (
            <div className="container">
                <Navbar user={this.props.user} />
                <Dialog
                    open={this.state.open}
                >
                    <Grid container justify='center' style={{ marginTop: 10 }}>
                    </Grid>
                    <DialogActions>
                        {/* <p>count</p> */}
                        <img src={loader} alt='loader'></img>
                    </DialogActions>
                </Dialog>
                <div>
                    <Container maxWidth="sm">
                        <center><h1>Add Meeting</h1></center>
                        <Container maxWidth="sm">

                            <div className="position">
                                <center>
                                    <TextField
                                        id="Name"
                                        className="text"
                                        placeholder="Meeting"
                                        variant="outlined"
                                        required
                                        value={this.state.name}
                                        onChange={this.meeting.bind(this)}
                                    />
                                </center>
                            </div>

                            <div className="position">
                                <center>
                                    <TextField
                                        id="RName"
                                        className="text"
                                        value={this.state.location}
                                        placeholder="Location"
                                        variant="outlined"
                                        required
                                        onChange={this.location.bind(this)}
                                    />
                                </center>
                            </div>

                            <div className="position">
                                <center>
                                    <TextField
                                        id="date"
                                        className="text"
                                        onChange={this.date.bind(this)}
                                        type="date"
                                        value={this.state.date}
                                        variant="outlined"
                                        required

                                    />
                                </center>
                            </div>
                            <div className="position">
                                <center>
                                    <TextField
                                        id="Name"
                                        className="text"
                                        value={this.state.time}
                                        placeholder="Time"
                                        type="time"
                                        variant="outlined"
                                        required
                                        onChange={this.time.bind(this)}

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
