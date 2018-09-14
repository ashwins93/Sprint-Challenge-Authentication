import React, { Component } from "react";
import axios from "axios";

const URL = "http://localhost:3300";

class Jokes extends Component {
  state = {
    jokes: [],
    joke: 0
  };

  requestJokes = () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return this.props.invalidateToken();
    axios({
      url: URL + "/api/jokes",
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        if (response.data.error) return this.props.invalidateToken();

        this.setState({ jokes: response.data.results, joke: 0 });
      })
      .catch(error => {
        console.log(error);
        this.props.invalidateToken();
      });
  };

  componentDidMount() {
    this.requestJokes();
  }

  next = () => {
    this.setState(({ joke, jokes }) => ({
      joke: (joke + 1) % jokes.length
    }));
  };

  render() {
    if (this.state.jokes.length === 0) return <div>Creating bad jokes</div>;
    return (
      <div>
        <div>{this.state.jokes[this.state.joke].setup}</div>
        <div>{this.state.jokes[this.state.joke].punchline}</div>
        <button onClick={this.next}>Uggh! Alright next!</button>
        <button onClick={this.requestJokes}>Request more bad jokes</button>
      </div>
    );
  }
}

export default Jokes;
