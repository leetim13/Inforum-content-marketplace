import React from "react";
import { Route, Switch } from 'react-router-dom';
import { Col, Container, Jumbotron } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Sentry from '@sentry/react';

import { connect } from 'react-redux';

import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './_components';
import { Router } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { InstructionsPage } from './pages/InstructionsPage';

import NavBarComp from "./_components/NavBarComp";


// const server_url = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001/api';

function FallbackComponent() {
    return (
      <div>An error has occured</div>
    )
  }

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="App">
                <NavBarComp/>
                <Router history={history}>
                    <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
                        <Jumbotron>
                            <Container>
                                <Col sm={{span: 8, offset: 2}}>
                                    {alert.message &&
                                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                                    }
                                    <Switch>
                                        <Route path="/login" component={LoginPage} />
                                        <Route path="/instructions" component={InstructionsPage} />
                                        <PrivateRoute exact path="/" component={HomePage} />
                                    </Switch>
                                </Col>
                            </Container>
                        </Jumbotron>
                    </Sentry.ErrorBoundary>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = Sentry.withProfiler(connect(mapStateToProps)(App));

// export default App;
export { connectedApp as App };
