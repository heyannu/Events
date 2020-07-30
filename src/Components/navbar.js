import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import firebase from 'firebase'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { BrowserRouter as Link, Redirect } from "react-router-dom";


export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: true,
        }
    }

    logout(e) {
        firebase.auth().signOut();
        this.setState({ valid: false })
    }

    render() {
        if (this.state.valid == false) {
            return <Redirect to={{
                pathname: '/',
            }} />
        }
        return (
            <div>
                <AppBar position="fixed" style={styles.direction}>
                    <Toolbar>
                        <div style={styles.dir}>
                            <Button color="secondary" variant="contained">Add Event</Button>
                            <Button color="secondary" variant="contained">View Event</Button>
                        </div>
                        <div style={styles.nav}>
                            <AccountCircleRoundedIcon style={styles.icon} />
                            <Button color="secondary" variant="contained" onClick={this.logout.bind(this)}>Logout</Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
const styles = {
    direction: {
        width: "100vw",
        lineHeight: "1px",
        float: 'right',
        background: "rgba(62, 78, 28, 0.8)"
    },
    dir: {
        width: "100vw",
        lineHeight: "1px",
        float: 'right',
        marginLeft:"3vh"
    },
    nav: {
        display: "flex",
        flexDirection: "row"
    },
    icon: {
        margin: "1vh"
    }

}