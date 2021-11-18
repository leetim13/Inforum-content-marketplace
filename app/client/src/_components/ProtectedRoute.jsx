import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UnauthorizedPage } from '../pages/Unauthorized';

export class ProtectedRoute extends React.Component {
    constructor(props) {
        super(props);
        this.authRoles = props.roles;
        console.log(this.authRoles);
    }

    render() {
        const { component: Component, ...rest } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        return (
            <Route {...rest} render={props => (
                user ? (this.authRoles.includes(user.role) ? <Component {...props} /> : <UnauthorizedPage/>)
                    : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )} />
        )
    }
}