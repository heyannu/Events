import React, { Component } from 'react';
import fault from './Assets/images/404.gif'
import "./Assets/styles.css"

export default class UsersNotFound extends Component {
    render() {
        return (
            <div style={{ overflow: 'hidden' }}>
                <img src={fault} alt="404" style={{ width: '100%', height: '100%' }}></img>
            </div>
        );
    }
}
