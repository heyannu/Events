import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { BrowserRouter as  Redirect, Link } from "react-router-dom";
import "./Assets/styles.css"
export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: true,
            anchorEl: false,
        }
    }

    click(e) {
        this.setState({ anchorEl: e.currentTarget });
    }
    close(e) {
        this.setState({ anchorEl: null })
        firebase.auth().signOut();
        this.setState({
            valid: false,
        });
    }
    render() {
        const open = Boolean(this.state.anchorEl);
        if (this.state.valid === false) {
            return <Redirect to={{
                pathname: '/',
            }} />
        }
        return (
            <div>
                <AppBar position="fixed" style={styles.direction}>
                    <Toolbar>
                        <div style={styles.dir}>
                            <Link to={{pathname:'/addEvent'}}><Button variant="outlined" class="bg">Add Event</Button></Link>
                            <Link to={{pathname:'/addMeeting'}}><Button class="bg" variant="outlined">Add Meeting</Button></Link>
                            <Link to={{pathname:'/'}}><Button class="bg" variant="outlined">Messages</Button></Link>

                        </div>
                        <div style={styles.nav} onClick={this.click.bind(this)} >
                            <AccountCircleRoundedIcon style={styles.icon} />
                            <Menu
                                anchorEl={this.state.anchorEl}
                                keepMounted
                                open={open}
                                onClose={this.close.bind(this)}
                            >

                                <MenuItem onClick={this.close.bind(this)}>
                                    <Button>Logout</Button>
                                </MenuItem>

                                <MenuItem>
                                <Link to={{pathname:'/viewEvent'}}><Button>View Events</Button> </Link>
                                </MenuItem>

                                <MenuItem>
                                <Link to={{pathname:'/viewMeeting'}}> <Button>View Meetings</Button> </Link>
                                </MenuItem>

                            </Menu>
        <p>{this.props.user}</p>
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