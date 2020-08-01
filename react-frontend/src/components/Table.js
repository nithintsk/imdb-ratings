import React from 'react';
import axios from 'axios';
import logo from '../logo.svg';
import '../styles/Results.css';
import '../styles/Table.css';

export default class table extends React.Component {
    
    constructor(props) {
        super(props);
        this.getRows   = this.getRows.bind(this);
    }

    getRows = function(table) {
        return table.map((row, index) => {
            return (
                <tr key={index}>
                    <td key="season">Season {index+1}</td>
                    <RenderRow key={index} row={row} />
                </tr>
            );
        })
    }

    render() {
        const results = this.props.results;
        console.log(Object.keys(results).length);
        if (Object.keys(results).length) {
            console.log("Results Obtained");
            const ratings_data = results.results;
            if (Object.keys(ratings_data).length && ratings_data.length) {
                console.log("Rendering ratings");
                return (
                    <React.Fragment>
                        <div className="ratings-table">
                            <table>
                                <tbody>
                                    {this.getRows(ratings_data)}
                                </tbody>
                            </table>
                        </div>
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        <div>
                            <p>
                                No data found for the selected TV show.
                            </p>
                        </div>
                    </React.Fragment>
                );
            }
        } else {
            return (
                <div>
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Loading...
                    </p>
                </div>
            );
        }
    }
}

const RenderRow = (props) => {
    return Object.keys(props.row).map((ep, index) => {
        return <td key={index}>{props.row[ep]}</td>
    })
}
