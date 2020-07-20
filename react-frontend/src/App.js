import React from 'react';
import './styles/App.css';
import Search from './components/Search.js'
import Results from './components/Results.js'

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
        this.setState({searchResults: results});
    };
    
    updateRatings = (results) => {
        console.log(results);
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
                </header>
            </div>
        );
    };
}

export default App;
