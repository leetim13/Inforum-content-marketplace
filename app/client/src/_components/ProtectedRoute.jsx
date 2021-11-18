import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UnauthorizedPage } from '../pages/Unauthorized';
import { connect } from 'react-redux';

class ProtectedRoute extends React.Component {
    constructor(props) {
        super(props);
        this.authRoles = props.roles;
    }

    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route {...rest} render={props => (
                this.props.user ? (this.authRoles.includes(this.props.user.role) ? <Component {...props} /> : <UnauthorizedPage/>)
                    : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )} />
        )
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedProtectedRoute = connect(mapStateToProps)(ProtectedRoute);
export { connectedProtectedRoute as ProtectedRoute };