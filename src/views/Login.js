import React, { useState, useContext } from "react";
import { withRouter } from 'react-router-dom'
import "../styles/login.css"


import AuthService from "../services/auth.service";
import UserContext from "../contexts/user.context";

const Login = props => {
    const [id, setId] = useState("");
    const [email, setEmail] = useState(true)
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useContext(UserContext);

    const emailRegex = /[a-z0-9]{2,8}@+([0-9]{4})\..*?[a-z]{2}$/;
    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);
        AuthService.login(id, password).then(
            (res) => {
                setLoading(false);
                setUser(res);
                props.history.push("/");
            },
            (error) => {
                setLoading(false);
            }
        )
    };
    const handleChange = (ev) => {
        setId(ev.target.value)
        if (!ev.target.value.match(emailRegex)) {
            setEmail(false)
        }else {
            setEmail(true)
        }
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Colonist ID"
                            name="id"
                            value={id}
                            onChange={(ev) => handleChange(ev, "id")}
                        />
                    </div>
                    <div className="my-2">{!email && 'your eamil is not valid'}</div>


                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            required
                            name="password"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="none" value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                        />
                    </div>

                    <div className="form-group mt-4">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default withRouter(Login);
