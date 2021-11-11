import React from "react";


const Navbar = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand" href="/"> BLUEGROUND</a>
            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <span className="profile">
                        {/* add the img */}
                    </span>
                    <label className="profile-name">nma</label>
                </li>
                <li>
                    <label className="logout-btn">logout</label>
                </li>
            </div>
        </nav>
    )
}

export default Navbar;