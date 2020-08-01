import React, { Component } from "react";
import Navbar from "./navbar"
import firebase from "firebase"
import { Radio } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import loader from './Assets/images/loader.gif'
import RadioGroup from '@material-ui/core/RadioGroup';
import Tooltip from '@material-ui/core/Tooltip';
import swal from 'sweetalert';
import { useSelector } from 'react-redux'
// const count = useSelector(users);
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      annimessage: [],
      bdaymessage: [],
      type: "bday",
      open: true,
      value: '',
      selectedValue: ""
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
      bdaymessage: this.state.bdaymessage,
      open: false
    })
  }

  radio(e) {
    this.setState({
      selectedValue: e.target.value
    }, () => {

      if (this.state.selectedValue == "bday") {
        this.setState({ type: "bday" })
      }
      else if (this.state.selectedValue == "anni") {
        this.setState({ type: "anni" })
      }
    })
  }
  oncopyMessage(e, copy, t) {
    this.setState({
      value: e.msg,
      type: copy
    }, () => {
      swal({
        title: "Copied",
        icon: "success",
        button: "OK",
      });
    })

  }
  render() {
    return (
      <div className="home" style={{ background:"rgba(0,0,0,0.8"}}>
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
        <div className="logo">
          <div className="img" style={{background:"#ffffff86", marginBottom:"4vh", borderRadius:"25px"}}>
            <RadioGroup row aria-label="position" name="position" defaultValue="bday" style={{ color: "#000" }} onChange={this.radio.bind(this)} id="top">
              <div>
                <FormControlLabel
                  value="bday"
                  control={<Radio color="primary" />}
                  label="Birthday Wishes"
                  labelPlacement="end"
                  name="radio"
                />
              </div>
              <div>
                <FormControlLabel
                  value="anni"
                  name="radio"
                  control={<Radio color="primary" />}
                  label="Anniversary Wishes"
                  labelPlacement="end"
                />
              </div>

            </RadioGroup>
          </div>
          <div className="msgs">
            {this.state.type == 'bday' ? this.state.bdaymessage.map((e, index) =>
              <div className="gr">
                <Tooltip title="Double Click to Copy">
                <CopyToClipboard text={this.state.value} className="disp" onCopy={this.oncopyMessage.bind(this, e, "bday")}>
                  <div className="ll">{e.msg}</div>
                </CopyToClipboard>
              </Tooltip>
              </div>
            ) : null}
            {this.state.type == 'anni' ? this.state.annimessage.map((e, index) =>
              <Tooltip title="Double Click to Copy">
                <CopyToClipboard text={this.state.value} className="disp" onCopy={this.oncopyMessage.bind(this, e, "anni")}>
                  <div className="ll">{e.msg}</div>
                </CopyToClipboard>
              </Tooltip>
            ) : null}
          </div>
        </div>
      </div >
    )
  }
}
