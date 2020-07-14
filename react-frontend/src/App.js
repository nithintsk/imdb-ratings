import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form.js';

class App extends React.Component {

    displayResults = (matchingSeriesList) => {
        console.log(matchingSeriesList);
    };

    render() {
    return (
         <div className="App">
             <header className="App-header">
               <h1>IMDb TV ratings visualizer</h1>
               <Form onSubmit={this.displayResults} />
               <img src={logo} className="App-logo" alt="logo" />
               <p>
                 Compare the ratings of episodes from S01E01 to the finale using a color coded heatmap
               </p>
         {/*<a
               className="App-link"
               href="https://reactjs.org"
               target="_blank"
               rel="noopener noreferrer"
             >
               Learn React
             </a>*/}
             </header>
        </div>
        );
    };
}

export default App;
