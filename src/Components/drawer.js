import React, { Component } from "react";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
export default class CustomDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        list : ["Add Event","View Events"]
    }
  }
  selectoption(e) {

  }
render() {
    return(
        <div style={{background:'blue'}}>
      <List>
        {this.state.list.map((text, index) => (
          <ListItem button key={text} style={{background:"red", width:"15vw"}} onClick={this.selectoption.bind(this)}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      </div>
  
    )
}
}