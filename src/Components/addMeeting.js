import React, { Component } from 'react';
import Navbar from './navbar'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import firebase from './firebase'
import './Assets/styles.css'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import loader from './Assets/images/loader.gif'


export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
         name:'',
         date:'',
         time:'',
         location:'',
         open:true
        }
    }

    componentDidMount() {
        this.setState({ open:false})
    }
    meeting(e) {
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
    time(e) {
        this.setState({ time: e.target.value })
    }
    location(e) {
        this.setState({ location: e.target.value })
    }
    submit(e) {
        console.log(this.state)
        const st = this.state;
        if (st.name == "" || st.date == "" || st.time == "" || st.location == "") {
            alert("Fields cannot be empty");
        }
        else {
            const eventRecord = { name: this.state.name, date: this.state.date, time: this.state.time, location: this.state.location}
            const db = firebase.firestore()
            db.collection('meeting').add({ eventRecord: eventRecord }).then(() => {
                console.log("created")
            })
        }
    }
render() {
    return (
        <div className="container">
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
            <div>
                <Container maxWidth="sm">
                    <center><h1>Add Meeting</h1></center>
                    <Container maxWidth="sm">
                       
                    <div className="position">
                            <center>
                                <TextField
                                    id="Name"
                                    placeholder="Meeting"
                                    variant="outlined"
                                    required
                                    onChange={this.meeting.bind(this)}
                                />
                            </center>
                        </div>
                        
                        <div className="position">
                            <center>
                                <TextField
                                    id="RName"
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
