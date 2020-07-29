import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CustomDrawer from './drawer'
import Button from '@material-ui/core/Button';


export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: true,
        }
    }

    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    render() {
        return (
            <div>
                <AppBar position="fixed" style={styles.direction}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={this.handleDrawerToggle.bind(this)}
                        >
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Responsive drawer
                      </Typography>

                        <div style={styles.direction}>
                            <Button>Add Event</Button>
                            <Button>View Events</Button>
                            <Button>Upcoming Events</Button>
                        </div>

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
const styles = {
    direction: {
        width:"100vw",
        lineHeight:"1px",
        float: 'right'
    }
}