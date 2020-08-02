import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { BrowserRouter as Link, Redirect } from "react-router-dom";
import "./Assets/styles.css"

const options = [
    'Logout',
    'View Events',
    'View Meeting'
];
export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: true,
            anchorEl: false,
            redirectE: false,
            redirectM: false,

        }
    }

    click(e) {
        this.setState({ anchorEl: e.currentTarget });
    }
    close(e, option) {
        this.setState({ anchorEl: null })
        if (e == "Logout") {
            firebase.auth().signOut();
            this.setState({
                valid: false,
            });
        }
        else if (e == "View Events") {
            this.setState({
                redirectE: true
            });
        }
        else if (e == "View Meeting") {
            this.setState({
                redirectM: true
            });
        }
    }
    render() {
        const open = Boolean(this.state.anchorEl);
        if (this.state.valid == false) {
            return <Redirect to={{
                pathname: '/',
            }} />
        }
        else if (this.state.redirectE == true) {
            return <Redirect to={{
                pathname: '/viewEvent',
            }} />
        }
        else if (this.state.redirectM == true) {
            return <Redirect to={{
                pathname: '/viewMeeting',
            }} />
        }
        return (
            <div>
                <AppBar position="fixed" style={styles.direction}>
                    <Toolbar>
                        <div style={styles.dir}>
                            <a href="./addEvent"><Button variant="outlined" class="bg">Add Event</Button></a>
                            <a href="./addMeeting"><Button class="bg" variant="outlined">Add Meeting</Button></a>
                            <a href="./home"><Button class="bg" variant="outlined">Messages</Button></a>

                        </div>
                        <div style={styles.nav}>
                            <AccountCircleRoundedIcon style={styles.icon} onClick={this.click.bind(this)} />
                            <Menu
                                anchorEl={this.state.anchorEl}
                                keepMounted
                                open={open}
                                onClose={this.close.bind(this)}
                            >
                                {options.map((option) => (
                                    <MenuItem key={option} onClick={this.close.bind(this, option)}>
                                        <Button>{option}</Button>
                                    </MenuItem>
                                ))}
                            </Menu>
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
        background: "#222831"
    },
    dir: {
        width: "100vw",
        lineHeight: "1px",
        float: 'right',
        marginLeft: "3vh"
    },
    nav: {
        display: "flex",
        flexDirection: "row"
    },
    icon: {
        margin: "1vh"
    }

}