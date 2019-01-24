import React, { Component, Fragment } from "react";
import axios from "axios";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

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
    console.log(this.props.history);
    if (this.state.users.length === 0) {
      console.log("true");
      return (
        <div className="userMainContainer">
          <h2>List of Users</h2>
          <div className="errContainer">
            <h3>You are not Signed In, click bellow to Sign In:</h3>
            <button
              onClick={() => {
                this.props.history.push("/signin");
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      );
    } else {
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
}

export default Users;

// () => {
//   this.props.history.push("/");
// };
