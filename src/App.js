import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Link } from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import Home from "./components/Home";

import Navbar from './components/Navbar'


function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <Switch>
        <Route exact path="/"> 
            {LocalStorageService.isLoggedIn() ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login"> 
            {LocalStorageService.isLoggedIn() ? <Redirect to="/" /> : <Login /> }
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
