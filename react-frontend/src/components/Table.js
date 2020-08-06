import React from 'react';
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
                    <td key="season" className="season"><strong>Season {index+1}</strong></td>
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
        
        const green   = Math.round(127 * (2*val/10.0)) ;
        const red = Math.round(255 * 2 * (1-val/10.0));
        const blue  = val > 5 ? Math.round(200 * 2 * (1-val/10.0)) : Math.round(127 * (1.2*val/10.0));
        */
        val = 10-val > 0 ? 10-val : 0;
        const red   = Math.round(200 * (2*val/3.5)) ;
        const green = Math.round(230 * 2 * (1-val/3.5));
        const blue = 0;
        return (`${red},${green},${blue}`)
    }

    renderRow = function(rowData) {
        return Object.keys(rowData).map((ep, index) => {
            return <td key={index}
                    className="ratingcell"
                    style={{background: "rgb("+ this.getColor(rowData[ep]['rating']) +")"}}
                    title={`Episode: ${index+1} - ${rowData[ep]['title']}`}
                    >
                { rowData[ep]['rating'] }
                </td>
        })
    }
    
    render() {
        const results = this.props.results;
        if (Object.keys(results).length) {
            const ratings_data = results.results;
            if (Object.keys(ratings_data).length && ratings_data.length) {
                return (
                    <div className="outer-container">
                        <h3>{results.title}   |   Overall rating: {results.rating}/10</h3>
                        <div className="table-container">
                            <table>
                                <tbody>
                                    {this.getRows(ratings_data)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            } else {
                return (
                        <div>
                            <p>
                                No data found for the selected TV show.
                            </p>
                        </div>
                );
            }
        } else {
            return (
                <div>
                </div>
            );
        }
    }
}

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
