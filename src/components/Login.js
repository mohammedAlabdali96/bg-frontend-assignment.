import React, { useState, useRef } from "react";
import { useHistory } from "rect-router-dom";
import authService from "../services/auth.service";


const Login = (props) => {
    const history = useHistory();

    const [id, serId] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);
        AuthService.login(id, password).then(
            (res) => {
                history.push("/");
            },
            (error) => {
                setLoading(false);
            }
        )
    };

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
                            onChange={(ev) => setId(ev.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            required
                            name="password"
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                        />
                    </div>

                    <div className="form-group">
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
}

export default Login;
