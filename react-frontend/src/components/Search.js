import React from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import '../styles/Search.css';
import Loader from '../loader.gif';

class Search extends React.Component {
    
    constructor( props ) {
        super( props );
        this.state = {
            seriesName: '',
            results: {},
            loading: false,
            message: '',
            redirect: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchSearchResult = this.fetchSearchResults.bind(this);
    }
    
    handleSubmit = async (event) => {
        event.preventDefault();
        console.log(this.state.seriesName);
        const query = this.state.seriesName;
        if (!query) {
            this.setState({ results: {}, message: '' });
        } else {
            this.setState({ loading: true, message: '' },
            () => {
                this.fetchSearchResults(1, query);
                {/*this.setState({ seriesName: '' });*/}
            });
        }
    };

    fetchSearchResults = async (updatedPageNo = '', seriesName) => {
        const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
        const searchUrl = '/search';
        if (this.cancel) {
            this.cancel.cancel();    
        }
        this.cancel = axios.CancelToken.source();
        const res = await axios.get(searchUrl, {
                        params: {
                            seriesName: this.state.seriesName
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
        const resultNotFoundMsg = ! res.data.length ? 'No available search results.' : '';
        this.props.onSubmit(res.data);
        this.setState({
            results: res.data,
            message: resultNotFoundMsg,
            loading: false,
            redirect: "/searchresults"
        });
    };

    render() {
        const {message, loading, redirect} = this.state;
        return (
            <div className="search-form">
                <label className="search-label" htmlFor="search-input">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            value={this.state.seriesName}
                            onChange={event => this.setState({ seriesName: event.target.value })}
                            id="search-input"
                            placeholder=" Enter TV Series Name..."
                            required
                        />
                        &nbsp;&nbsp;
                        <button className="buttonSearch">Search</button>
                    </form>
                </label>
                { message && <p className="message">{message}</p> }
                < img src={Loader} className={`search-loading ${ loading ? 'show' : 'hide' }`} 
                  alt="loader"/>
            </div>
        )
    }
}

export default Search;
