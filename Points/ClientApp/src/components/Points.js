import React, { Component } from 'react';
import Plot from "react-plotly.js";
import { Button } from 'react-bootstrap';
import { Stats } from './Stats';

const initialState = {
    x: [],
    y: [],
    inside: 0,
    outside: 0
};

export class Points extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.generatePoints = this.generatePoints.bind(this);
    }
    counter = 0;

    generatePoints() {
        this.counter++;
        this.setState(initialState);
        let xArray = [];
        let yArray = [];

        for (let i = 0; i < 100; i++) {
            let x = Math.floor((Math.random() * 1000));
            let y = Math.floor((Math.random() * 1000));
            xArray.push(x);
            yArray.push(y);
            const isInside = this.isWithinRadiusOfCenter(x, y);
            this.updateCounter(isInside);
        }
        this.setState({
            x: xArray,
            y: yArray
        });
    }

    isWithinRadiusOfCenter(x, y, gridSize = 1000, radius = 450) {
        let centre = gridSize / 2;
        let distance = Math.sqrt(Math.pow(centre - x, 2) + Math.pow(centre - y, 2));
        return distance < radius;
    }

    updateCounter(isInside) {
        this.setState(prevState => {
            return isInside ? { inside: prevState.inside + 1 } : { outside: prevState.outside + 1 };
        });
    }

    render() {
        return (
            <div>
                <Stats
                    trial={this.counter}
                    inside={this.state.inside}
                    outside={this.state.outside}
                /><br />
                <p>
                    <Button variant="outline-primary" size="lg" onClick={this.generatePoints}>Let there be points</Button>{' '}
                </p>
                <Plot
                    data={[
                        {
                            x: this.state.x,
                            y: this.state.y,
                            type: 'scatter',
                            mode: 'markers',
                            marker: { color: 'purple' }
                        },
                        
                    ]}
                    layout={{ width: '100%', height: 1000, title: 'Points' },
                    {
                        title: 'Points',
                        xaxis: {
                            range: [0, 1000],
                            zeroline: false
                        },
                        yaxis: {
                            range: [0, 1000]
                        },
                        width: 500,
                        height: 500,
                        shapes: [
                            {
                                type: 'circle',
                                x0: 50,
                                y0: 50,
                                x1: 950,
                                y1: 950,
                                line: {
                                    color: 'rgba(50, 171, 96, 1)'
                                }
                            }
                        ]
                    }}
                    config={{ displaylogo: false }}
                />
                
            </div>
        )
    }
}
