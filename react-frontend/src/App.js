import React from 'react';
import { Browser, Route, Switch} from 'react-router-dom';
import './styles/App.css';
import Search from './components/Search.js'
import Results from './components/Results.js'
import Table from './components/Table.js'

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            ratingsResults: []
        }
        this.updateSearchResults = this.updateSearchResults.bind(this);
        this.updateRatings = this.updateRatings.bind(this);
    }

    updateSearchResults = (results) => {
        console.log(results);
        this.setState({ratingsResults: []});
        this.setState({searchResults: results});
    };
    
    updateRatings = (results) => {
        console.log(results);
        this.setState({searchResults: []});
        this.setState({ratingsResults: results});
    };

    render() {
        const {searchResults, ratingsResults} = this.state;
        return (
             <div className="App">
                <header className="App-header">
                    <h1>IMDb TV ratings visualizer</h1>
                    <Search onSubmit={this.updateSearchResults} />
                    <Results onClick={this.updateRatings} results={searchResults}/>
                    <Table results={ratingsResults}/>
                    {/*<Route path="/" render={() =>
                         <Search onSubmit={this.updateSearchResults} />}
                    />
                    <Route path="/searchresults" render={() => 
                        <Results onClick={this.updateRatings} results={searchResults}/>}
                    />
                    <Route path="/ratings" render={() =>
                        <Table results={ratingsResults}/> }
                    />*/}
                </header>
            </div>
        );
    };
}

export default App;
