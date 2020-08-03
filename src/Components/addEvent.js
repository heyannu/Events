import React, { Component } from 'react';
import Navbar from './navbar'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import firebase from './firebase'
import './Assets/css/styles.css'
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
            user: '',
            day: '',
            month: "",
            year: "",
            event: '',
            open: true,
            signature: '',
        }
    }

    componentDidMount() {
        this.setState({ open: false })
    }
    name(e) {
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
    event(e) {
        this.setState({ event: e.target.value })
    }
    signature(e) {
        this.setState({ signature: e.target.value })
    }
    submit(e) {
        if (e.key == 'Enter' || e.type == 'click') {
            const st = this.state;
            if (st.name === "" || st.event === "" || st.date === "" || st.signature === "") {
                swal("Fields cannot be empty");
            }
            else {
                const eventRecord = { name: this.state.name, day: this.state.day, month: this.state.month, year: this.state.year, event: this.state.event, signature: this.state.signature }
                const db = firebase.firestore()
                db.collection('eventRecord').add({ uid: this.props.user.uid, eventRecord: eventRecord }).then(() => {
                    swal({
                        title: 'Created',
                        icon: 'success',
                        button: 'OK'
                    })
                    this.setState({
                        name: "",
                        event: "",
                        date: "",
                        signature: ""
                    })
                })
            }
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
                        <center><h1>Add Event</h1></center>
                        <Container maxWidth="sm">

                            <div className="position">
                                <center>
                                    <Select
                                        labelId="Event"
                                        placeholder="Event"
                                        id="Event"
                                        required
                                        className="text"
                                        value={this.state.event}
                                        variant="outlined"
                                        onChange={this.event.bind(this)}
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
                                        className="text"
                                        value={this.state.name}
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
                                        className="text"
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
                                        placeholder="Signature"
                                        variant="outlined"
                                        className="text"
                                        required
                                        value={this.state.signature}
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
