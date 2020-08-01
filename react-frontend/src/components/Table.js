import React from 'react';
import axios from 'axios';
import logo from '../logo.svg';
import '../styles/Results.css';
import '../styles/Table.css';

export default class table extends React.Component {
    
    constructor(props) {
        super(props);
        this.getRows = this.getRows.bind(this);
        this.getColor = this.getColor.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    getRows = function(table) {
        return table.map((row, index) => {
            return (
                <tr key={index}>
                    <td key="season">Season {index+1}</td>
                    {this.renderRow(row)}
                </tr>
            );
        })
    }
    
    getColor = function(val) {
        /*
        const x = val*10;
        const red   = Math.round(255 * (x > 50 ? 1-2*(x-50)/100.0 : 1.0));
        const green = Math.round(255 * (x > 50 ? 1.0 : 2*x/100.0));
        const blue  = 100;
        */
        const green   = Math.round(127 * (2*val/10.0)) ;
        const red = Math.round(255 * 2 * (1-val/10.0));
        const blue  = val > 5 ? Math.round(200 * 2 * (1-val/10.0)) : Math.round(127 * (1.2*val/10.0));
        return (`${red},${green},${blue}`)
    }

    renderRow = function(rowData) {
        return Object.keys(rowData).map((ep, index) => {
            return <td key={index} style={{background: "rgb("+ this.getColor(rowData[ep]) +")"}}>
                { rowData[ep] }
                </td>
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
/*
*/


/*
const RenderRow = (props) => {
    return Object.keys(props.row).map((ep, index) => {
        return <td key={index} style={{ background: `rgb(${() => {
                                                        const x = props.row[ep]*10;
                                                        const red   = (x > 50 ? 1-2*(x-50)/100.0 : 1.0);
                                                        const green = (x > 50 ? 1.0 : 2*x/100.0);
                                                        const blue  = 0.0;
                                                        return (`${this.red},${this.green},${this.blue}`)
                                                        }})` }}>
                    {props.row[ep]}
            </td>
    })
}

 */
