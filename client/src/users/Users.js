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
      <div className="userMainContainer">
        <h2>List of Users</h2>
        <div className="userContainer">
          {this.state.users.map(item => {
            return (
              <div key={item.id} className="user">
                <h3>User Name: {item.username}</h3>
                <p>Department: {item.department}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Users;
