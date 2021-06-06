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
        this.generatePoints = this.generatePoints.bind(this);
        this.setN = this.setN.bind(this);
        this.setGridSize = this.setGridSize.bind(this);
        this.setIterations = this.setIterations.bind(this);
        this.setRadius = this.setRadius.bind(this);
    }

    // set default values
    iterations = 0;
    gridSize = 1000;
    radius = 450;
    n = 100;

    generatePoints() {
        this.iterations++;
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
        const centre = this.gridSize / 2;
        const distance = Math.sqrt(Math.pow(centre - x, 2) + Math.pow(centre - y, 2));
        return distance < this.radius;
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

    render() {
        return (
            <div>
                <Stats
                    trial={this.iterations}
                    inside={this.state.pointsInside}
                    outside={this.state.pointsOutside}
                    ratio={this.state.insideRatio}
                    pi={4 * this.state.insideRatio}
                /><br />
                <p>
                    <Button variant="outline-primary" size="lg" onClick={this.generatePoints}>Let there be points</Button>{' '}
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
