import React from 'react';
import axios from 'axios';
import '../styles/Table.css';

class Results extends React.Component {

    render() {
        const results = this.props.results;
        if (Object.keys(results).length && results.length) {
            return (
                <div className="results-container">
                    {results.map((result) => {
                        return (
                            <a  
                                key={result.id}
                                href={result.URL}
                                className="result-items"
                                onClick={ (event) => {
                                    this.handleClick(event, result.id) 
                                }}
                            >
                                <h6 className="image-name">{result.name}</h6>
                                <div className="image-wrapper">
                                    <img className="image" src={result.URL} alt={result.name}/>
                                </div>
                            </a>
                        );
                    })}
                </div>
            );
        } else {
            return (
                <div>
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                     Compare the ratings of episodes from S01E01 to the finale using a color coded heatmap
                    </p>
                </div>
            );
        }
    }
}

export default Results;

