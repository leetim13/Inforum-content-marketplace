import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export class ProtectedRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route {...rest} render={props => (
                localStorage.getItem('user')
                    ? <Component {...props} />
                    : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )} />
        )
    }
}