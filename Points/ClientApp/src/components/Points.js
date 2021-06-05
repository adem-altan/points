import React, { Component } from 'react';
import Plot from "react-plotly.js";
import { Button, Dropdown, DropdownButton, select } from 'react-bootstrap';
import { Stats } from './Stats';
import Select from 'react-select';

const initialState = {
    x: [],
    y: [],
    gridSize: 1000,
    radius: 450,
    n: 100,
    pointsInside: 0,
    pointsOutside: 0,
    insideRatio: 0.0,
    estimatedPiValue: 0.0
};
const options = [100, 200, 300, 400, 500, 1000];

export class Points extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.generatePoints = this.generatePoints.bind(this);
        this.setN = this.setN.bind(this);
    }

    counter = 0;
    n = 100;

    generatePoints() {
        this.counter++;
        this.setState(initialState);
        let xArray = [];
        let yArray = [];

        for (let i = 0; i < this.n; i++) {
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
        }, () => { this.findInsideRatioAndEstimatedPi() });
    }

    isWithinRadiusOfCenter(x, y) {
        const gridSize = this.state.gridSize;
        const radius = this.state.radius;
        const centre = gridSize / 2;
        const distance = Math.sqrt(Math.pow(centre - x, 2) + Math.pow(centre - y, 2));
        return distance < radius;
    }

    updateCounter(isInside) {
        this.setState(prevState => {
            return isInside ? { pointsInside: prevState.pointsInside + 1 } :
                              { pointsOutside: prevState.pointsOutside + 1 };
        });
    }

    findInsideRatioAndEstimatedPi() {
        const ratio = (this.state.pointsInside / this.n);
        this.setState({
            insideRatio: ratio
        });
    }

    setN(e) {
        this.n = e;
        //this.setState({
        //    n: e
        //});
    }

    render() {
        return (
            <div>
                <Stats
                    trial={this.counter}
                    inside={this.state.pointsInside}
                    outside={this.state.pointsOutside}
                    ratio={this.state.insideRatio}
                    pi={4 * this.state.insideRatio}
                /><br />
                <p>
                    <Button variant="outline-primary" size="lg" onClick={this.generatePoints}>Let there be points</Button>{' '}
                </p>
                <Select
                    defaultValue="100"
                    value={this.n}
                    onChange={this.setN}
                    options={options}
                />
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
