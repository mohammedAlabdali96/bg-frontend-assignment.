import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import LocalStorageService from "../services/localstorage.service";

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !LocalStorageService.isLoggedIn()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
);

export default AuthRoute;