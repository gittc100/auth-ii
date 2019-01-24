import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const endpoint = "http://localhost:4400/api/login";
    axios
      .post(endpoint, this.state)
      .then(res=>{
          localStorage.setItem('jwt', res.data.token);
      })
      .catch(err => {
        console.log({ Error: err });
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="text"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default Login;
