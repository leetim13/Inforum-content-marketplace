import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UnauthorizedPage } from '../pages/Unauthorized';

export class BankRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { component: Component, ...rest } = this.props;
        const user = localStorage.getItem('user');
        return (
            <Route {...rest} render={props => (
                user ? (user.role === 'Bank' ? <Component {...props} /> : <UnauthorizedPage/>)
                    : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )} />
        )
    }
}