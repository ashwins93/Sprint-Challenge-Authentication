import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import Form from "./components/Form";
import Jokes from "./components/Jokes";

const URL = "http://localhost:3300";

class App extends Component {
  state = {
    loggedIn: false,
    status: ""
  };

  setStatus = status => {
    this.setState({
      status
    });
    setTimeout(() => this.setState({ status: "" }), 5000);
  };

  login = ({ username, password }) => {
    this.setStatus("Sending request...");
    axios
      .post(URL + "/api/login", { username, password })
      .then(response => {
        this.setStatus(response.data.message);
        if (!response.data.error) {
          localStorage.setItem("auth-token", response.data.token);
          this.setState({ loggedIn: true });
        }
      })
      .catch(error => {
        this.setStatus("Something went wrong");
        console.log(error);
      });
  };

  register = ({ username, password }) => {
    this.setStatus("Sending request...");
    axios
      .post(URL + "/api/register", { username, password })
      .then(response => {
        this.setStatus(response.data.message);
        if (!response.data.error) {
          localStorage.setItem("auth-token", response.data.token);
          this.setState({ loggedIn: true });
        }
      })
      .catch(error => {
        this.setStatus("Something went wrong");
        console.log(error);
      });
  };

  logout = () => {
    localStorage.removeItem("auth-token");
    this.setStatus("Logged out");
    this.setState({ loggedIn: false });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bad Jokes</h1>
          <nav>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
            <li>
              <Link to="/jokes">Jokes</Link>
            </li>
            <li>
              <Link to="/">Logout</Link>
            </li>
          </nav>
        </header>
        <main>
          <p>{this.state.status}</p>
          <Route
            exact
            path="/"
            render={() => <Form title="Login" onSubmit={this.login} />}
          />
          <Route
            exact
            path="/register"
            render={() => <Form title="Sign Up" onSubmit={this.register} />}
          />
          <Route
            exact
            path="/jokes"
            render={() => <Jokes invalidateToken={this.logout} />}
          />
        </main>
      </div>
    );
  }
}

export default App;
