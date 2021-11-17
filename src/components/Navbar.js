import React, { useContext } from "react";
import { withRouter } from 'react-router-dom'

import "../styles/navbar.css";
import UserContext from "../contexts/user.context";
import LocalStorageService from "../services/localstorage.service";

const Navbar = props => {
    const { user, setUser } = useContext(UserContext);

    const logOut = () => {
        LocalStorageService.clearToken();
        props.history.push("/login");
        setUser(null);
    }
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark d-flex justify-content-between px-md-4">
            <a className="navbar-brand" href="/">
                Blueground on Mars
            </a>
            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <span className="profile px-md-4">
                        <img
                            src={user.picture}
                            alt="profile-img"
                            className="profile-img-card profile-img"
                        />
                        <label className="profile-name">{user && user.name}</label>
                    </span>
                </li>

                <li className="nav-item">
                    <label className="logout-btn" onClick={logOut}>Log out</label>
                </li>
            </div>
        </nav>
    )
}

export default withRouter(Navbar);