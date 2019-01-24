import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import Users from "./users/Users.js";
import Login from "./auth/Login.js";
import Signup from "./auth/Signup";
import "./App.css";

const Home = props => {
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to="/" exact>
              Home
            </NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
            <NavLink to="/signin">Login In</NavLink>
            <button onClick={this.signout}>Sign Out</button>
          </nav>
        </header>
        <main>
          <Route path="/" component={Home} exact />
          <Route path="/users" component={Users} />
          <Route path="/signin" component={Login} />
          <Route path="/signup" component={Signup} />
        </main>
      </div>
    );
  }

  signout = () => {
    localStorage.removeItem("jwt");
  };
}

export default App;
