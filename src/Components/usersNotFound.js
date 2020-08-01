import React, { Component } from 'react';
import fault from './Assets/images/404.gif'
import "./Assets/styles.css"

export default class UsersNotFound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div  style={{overflow: 'hidden'}}>
                <img src={fault} style={{width: '100%', height: '100%', maxWidth:"100vw", maxHeight:"100vh"}}></img>
            </div>
        );
    }
}