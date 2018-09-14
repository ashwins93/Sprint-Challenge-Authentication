import React, { Component } from "react";

class Form extends Component {
  state = {
    username: "",
    password: ""
  };

  formSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ username: "", password: "" });
  };

  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  render() {
    return (
      <form onSubmit={this.formSubmit}>
        <h2>{this.props.title}</h2>
        <div>
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
            autoComplete="off"
          />
          <label htmlFor="username">Username</label>
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
            autoComplete="off"
          />
          <label htmlFor="password">Password</label>
        </div>
        <button>Submit</button>
      </form>
    );
  }
}

export default Form;
