import React from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import Loader from '../loader.gif'; 
import '../styles/Results.css';

class Results extends React.Component {
    
    constructor( props ) {
        super( props );
        this.state = {
            seriesID: '',
            results : {},
            loading : false,
            message : '',
            redirect: null
        }
        this.handleClick = this.handleClick.bind(this);
        this.fetchRatings = this.fetchRatings.bind(this);
    }

    handleClick = async (event, id) => {
        event.preventDefault();
        this.setState({ seriesID: id, loading: true, message: '' },
        () => {
            this.fetchRatings(id);
        });
    };

    fetchRatings = async (id) => {
        console.log(id);
        const searchUrl = '/ratings';
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
                                loading: false,
                                message: 'Failed to fetch results from backend.'
                            });
                        }
                    })
        console.log(res.data)
        const resultNotFoundMsg = ! res.data.length ? 'No available ratings for the selected TV show.' : '';
        this.props.onClick(res.data);
        this.setState({
            results: res.data,
            message: resultNotFoundMsg,
            loading: false,
            redirect: "/ratings"
        });
    };

    render() {
        const results = this.props.results;
        const {message, loading, redirect} = this.state;
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
                    {/*{ message && <p className="message">{message}</p> }*/}
                    < img src={Loader} className={`search-loading ${ loading ? 'show' : 'hide' }`}
                      alt="loader"/>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
}

export default Results;

