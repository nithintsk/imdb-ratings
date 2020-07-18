import React from 'react';
import './styles/App.css';
import Search from './components/Search.js'
import Results from './components/Results.js'

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
        this.updateResults = this.updateResults.bind(this);
    }

    updateResults = (results) => {
        console.log(results);
        this.setState({results});
    };

    render() {
        const { results } = this.state;
        return (
             <div className="App">
                <header className="App-header">
                    <h1>IMDb TV ratings visualizer</h1>
                    <Search onSubmit={this.updateResults} />
                    <Results results={results}/>
                </header>
            </div>
        );
    };
}

export default App;
