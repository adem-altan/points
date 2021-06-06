import React, { Component } from 'react';
import Select from 'react-select';

const nOptions = [
    { value: 100, label: '100 (Default)' },
    { value: 500, label: '500' },
    { value: 1000, label: '1000' }
];

const iterationsOptions = [
    { value: 1, label: '1 (Default)' },
    { value: 10, label: '10' },
    { value: 100, label: '100' }
];

const gridSizeOptions = [
    { value: 1000, label: '1000 (Default)' },
    { value: 2000, label: '2000' },
    { value: 3000, label: '3000' }
]; 

const circleDiameterOptions = [
    { value: 450, label: '450 (Default)' },
    { value: 900, label: '900' },
    { value: 1800, label: '1800' }
];

export class Variables extends Component {
    constructor(props) {
        super(props);
        this.setN = this.setN.bind(this);
        this.setRadius = this.setRadius.bind(this);
        this.setGridSize = this.setGridSize.bind(this);
        this.setIterations = this.setIterations.bind(this);
    }

    setN(e) {
        this.props.onSelectN(e.value);
    }

    setIterations(e) {
        this.props.onSelectIterations(e.value);
    }

    setGridSize(e) {
        this.props.onSelectGridSize(e.value);
    }

    setRadius(e) {
        this.props.onSelectRadius(e.value);
    }

    render() {
        return (
            <div>
                <h2>Set Number of Points</h2>
                <Select
                    defaultValue={nOptions[0]}
                    onChange={this.setN}
                    options={nOptions}
                />
                <h2>Set Number of Iterations</h2>
                <Select
                    defaultValue={iterationsOptions[0]}
                    onChange={this.setIterations}
                    options={iterationsOptions}
                />
                <h2>Set Circle Diameter</h2>
                <Select
                    defaultValue={circleDiameterOptions[0]}
                    onChange={this.setRadius}
                    options={circleDiameterOptions}
                />
                <h2>Set Grid Size</h2>
                <Select
                    defaultValue={gridSizeOptions[0]}
                    onChange={this.setGridSize}
                    options={gridSizeOptions}
                />
            </div>
            )
    }
}