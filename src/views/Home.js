import React from "react";
import LocalStorageService from "../services/localstorage.service";


const Home = () => {
  const user = LocalStorageService.getUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Home Page</h3>
      </header>
    </div>
  );
};

export default Home;
