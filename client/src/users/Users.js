import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const endpoint = "http://localhost:4400/api/users";
    const options = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get(endpoint, options)
      .then(res => {
        console.log(res.data);
        this.setState({
          users: res.data.users
        });
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }

  render() {
    return (
      <div>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map(item => {
            return <li key={item.id}>{item.username}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Users;
