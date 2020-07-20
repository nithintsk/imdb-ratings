import React from 'react';
import axios from 'axios';
import logo from '../logo.svg';
import '../styles/Results.css';

class Results extends React.Component {
    
    constructor( props ) {
        super( props );
        this.state = {
            seriesID: '',
            results : {},
            message : ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.fetchRatings = this.fetchRatings.bind(this);
    }

    handleClick = async (event, id) => {
        event.preventDefault();
        this.setState({ seriesID: id },
        () => {
            this.fetchRatings(id);
        });
    };

    fetchRatings = async (id) => {
        console.log(id);
        const searchUrl = 'http://localhost:5000/ratings';
        if (this.cancel) {
            this.cancel.cancel();    
        }
        this.cancel = axios.CancelToken.source();
        const res = await axios.get(searchUrl, {
                        params: {
                            series_id: id
                        },
                        cancelToken: this.cancel.token
                    }).catch((error) => {
                        if (axios.isCancel(error) || error) {
                            this.setState({
                                message: 'Failed to fetch results from backend.'
                            });
                        }
                    })
        console.log(res.data)
        /*const resultNotFoundMsg = ! res.data.length ? 'No available ratings for the selected TV show.' : '';*/
        const resultNotFoundMsg = ''
        this.setState({
            results: res.data,
            message: resultNotFoundMsg
        });
        this.props.onClick(res.data);
    };

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

