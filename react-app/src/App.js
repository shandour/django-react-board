import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginChecker from "./components/LoginChecker";

export const UserContext = React.createContext(null);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.login = user => {
      this.setState({
        loggedIn: true,
        user
      });
    };

    this.logout = () => {
      this.setState({
        loggedIn: false,
        user: null
      });
      localStorage.removeItem("token");
    };

    this.state = {
      loggedIn: false,
      user: null,
      login: this.login,
      logout: this.logout
    };
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        <LoginChecker />
      </UserContext.Provider>
    );
  }
}

export default App;
