import React, { Component } from 'react';
import Plot from "react-plotly.js";
import { Button } from 'react-bootstrap';
import { Stats } from './Stats';
import { Variables } from './Variables';


const initialState = {
    x: [],
    y: [],
    pointsInside: 0,
    pointsOutside: 0,
    insideRatio: 0.0,
    estimatedPiValue: 0.0
};

export class Points extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.setN = this.setN.bind(this);
        this.setGridSize = this.setGridSize.bind(this);
        this.setIterations = this.setIterations.bind(this);
        this.setRadius = this.setRadius.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    // set default values
    iterations = 0;
    gridSize = 1000;
    radius = 450;
    n = 100;

    setN(n) {
        console.log('setting n');
        this.n = n;
    }

    setRadius(r) {
        console.log('setting radius');
        this.radius = r;
    }

    setGridSize(g) {
        console.log('setting grid size');
        this.gridSize = g;
    }

    setIterations(i) {
        console.log('setting iterations');
        this.iterations = i;
    }

    async handleClick() {
        const response = await fetch(`points?n=${this.n}&iterations=${this.iterations}&gridSize=${this.gridSize}&radius=${this.radius}`);
        const data = await response.json();
        this.setState({
            x: data.x,
            y: data.y,
            pointsInside: data.numberOfPointsInside,
            pointsOutside: data.numberOfPointsOutside,
            insideRatio: data.ratioOfPointsInside,
            estimatedPiValue: data.estimatedPi
        });
    }

    render() {
        return (
            <div>
                <Stats
                    trial={this.iterations}
                    inside={this.state.pointsInside}
                    outside={this.state.pointsOutside}
                    ratio={this.state.insideRatio}
                    pi={this.state.estimatedPiValue}
                /><br />
                <p>
                    <Button variant="outline-primary" size="lg" onClick={this.handleClick}>Let there be points</Button>{' '}
                </p>
                <Variables
                    onSelectN={this.setN}
                    onSelectRadius={this.setRadius}
                    onSelectGridSize={this.setGridSize}
                    onSelectIterations={this.setIterations}
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
