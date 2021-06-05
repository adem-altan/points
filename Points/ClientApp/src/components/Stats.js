import React, { Component } from 'react';
import { Toast, Badge } from 'react-bootstrap';

const initialState = {
    inside: 0,
    outside: 0,
    trial: 0,
    ratio: 0,
    pi: 0
};

export class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    render() {
        return (
            <div>
                <Toast>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">Stats</strong>
                        <small>Trial: {this.props.trial}</small>
                    </Toast.Header>
                    <Toast.Body>
                        <p>Inside: {this.props.inside}</p>
                        <p>Outside: {this.props.outside}</p>
                        <p>Ratio (points inside): {this.props.ratio*100}%</p>
                        <p>Pi (estimated): {this.props.pi}</p>
                    </Toast.Body>
                </Toast>
            </div>
        )
    }
}