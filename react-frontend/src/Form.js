import React from 'react';
import axios from 'axios';

class Form extends React.Component {
    state = { seriesName: "" };
    
    handleSubmit = async (event) => {
        event.preventDefault();
        console.log(this.state.seriesName);
        const resp = await axios.get("http://localhost:5000/", {
            params: {
                seriesName: this.state.seriesName
            }
        });
        this.props.onSubmit(resp.data);
        this.setState({ seriesname: "" });
    };
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                type="text"
                value={this.state.seriesName}
                onChange={event => this.setState({ seriesName: event.target.value })}
                placeholder="Enter TV Series Name"
                required
                />
                &nbsp;&nbsp;
                <button>Search</button>
            </form>
        );
    };
}

export default Form;
