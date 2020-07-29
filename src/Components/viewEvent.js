import React, { Component } from 'react';
import Navbar from './navbar'
import Container from '@material-ui/core/Container';
import firebase from './firebase'
import { Radio } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';

export default class ViewEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            bday: [],
            anni: [],
            loading: true,
            selectedValue: "All",
            type: ''
        }
    }

    duplicate(e) {
        var temp = []
        for (var i in e)
            if (temp.indexOf(e[i]) === -1) {
                temp.push(e[i]);
            };
            return temp;
    }

    compare(a, b) {
        const A = a.date;
        const B = b.date;

        let comparison = 0;
        if (A > B) {
            comparison = 1;
        } else if (A < B) {
            comparison = -1;
        }
        return comparison;
    }

    async componentWillMount() {
        const db = firebase.firestore()
        const snapshot = await db.collection('eventRecord').get()
        snapshot.forEach((doc) => {
            this.state.events.push(doc.data().eventRecord);
            this.setState({
                events: this.state.events
            }, () => {
                for (var i in this.state.events) {
                    if (this.state.events[i].event == "Birthday") {
                        this.state.bday.push(this.state.events[i]);
                    }
                    else if (this.state.events[i].event == "Anniversary") {
                        this.state.anni.push(this.state.events[i]);
                    }
                }

            })
            this.state.bday = this.duplicate(this.state.bday)
            this.state.anni = this.duplicate(this.state.anni)
            this.state.events.sort(this.compare)
            this.state.bday.sort(this.compare)
            this.state.anni.sort(this.compare)
        });



        this.setState({
            bday: this.state.bday,
            anni: this.state.anni
        })
    }


    radio(e) {
        let type = this.state;
        this.setState({
            selectedValue: e.target.value
        })
    }
    render() {
        return (
            <div style={styles.container}>
                {/* <Navbar /> */}
                <div>
                    <Container maxWidth="sm">
                        <RadioGroup row aria-label="position" name="position" defaultValue="All" onChange={this.radio.bind(this)}>
                            <FormControlLabel
                                value="All"
                                control={<Radio color="primary" />}
                                label="All Events"
                                labelPlacement="end"
                                name="radio"
                            />
                            <FormControlLabel
                                value="Bday"
                                name="radio"
                                control={<Radio color="primary" />}
                                label="Birthday"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="Anni"
                                name="radio"
                                control={<Radio color="primary" />}
                                label="Anniversary"
                                labelPlacement="end"
                            />
                        </RadioGroup>
                        {this.state.selectedValue == "All" ? this.state.events.map((e, index) =>
                            <div>
                                <div>{e.name}</div>
                                <div>{e.event}</div>
                                <div>{e.date}</div>
                            </div>
                        ) : null}
                        {this.state.selectedValue == "Bday" ? this.state.anni.map((e, index) =>
                            <div>
                                <div>{e.name}</div>
                                <div>{e.event}</div>
                                <div>{e.date}</div>
                            </div>
                        ) : null}

                        {this.state.selectedValue == "Anni" ? this.state.bday.map((e, index) =>
                            <div>
                                <div>{e.name}</div>
                                <div>{e.event}</div>
                                <div>{e.date}</div>
                            </div>
                        ) : null}

                    </Container>
                </div>
            </div>
        );
    }
}
const styles = {
    ul: {
        marginTop: "5em"
    }
}