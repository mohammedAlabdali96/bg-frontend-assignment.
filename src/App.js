import React, { useState, createContext, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import UserContext from "./contexts/UserContext";
import Login from "./views/Login";
import Home from "./views/Home";
import Navbar from "./components/Navbar";

import LocalStorageService from "./services/localstorage.service";

const App = () => {
  const [user, setUser] = useState(null);
  const userContext = { user, setUser };
  useEffect(() => {
    setUser(LocalStorageService.getUser());
  }, [])

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {user && <Navbar />}
      <div className="container mt-3">
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login">
            {user ? <Redirect to="/" /> : <Login />}
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
};

export default App;