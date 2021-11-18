import React from "react";
import { Route, Switch } from 'react-router-dom';
import { Col, Container, Jumbotron } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Sentry from '@sentry/react';

import { connect } from 'react-redux';

import { history } from './_helpers';
import { alertActions } from './_actions';
import { ProtectedRoute, AdminRoute, BankRoute, PromoterRoute } from './_components';
import { Router } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { InstructionsPage } from './pages/InstructionsPage';
import { LandingPage } from './pages/LandingPage';
import { OfferPage } from './pages/OfferPage';
import { ShareOfferPage } from './pages/ShareOfferPage';
import { VerifyOfferPage } from './pages/VerifyOfferPage';
import { MyRewardsPage } from './pages/MyRewardsPage';
import { MyPostsPage } from './pages/MyPostsPage';
import { InsightsPage } from './pages/InsightsPage';
import { CreateCampaignPage } from './pages/CreateCampaignPage';

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
                <Router history={history}>
                    <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
                        <Jumbotron>
                            <Container>
                                <NavBarComp/>
                                <Col sm={{span: 8, offset: 2}}>
                                    {alert.message &&
                                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                                    }
                                    <Switch>
                                        <Route path="/login" component={LoginPage} />
                                        <Route path="/instructions" component={InstructionsPage} />
                                        <Route path="/landing" component={LandingPage} />
                                        <ProtectedRoute roles={['User', 'Admin']} path="/offer" component={OfferPage} />
                                        <ProtectedRoute roles={['User', 'Admin']} path="/share" component={ShareOfferPage} />
                                        <ProtectedRoute roles={['User', 'Admin']} path="/verify" component={VerifyOfferPage} />
                                        <ProtectedRoute roles={['User', 'Admin']} path="/myRewards" component={MyRewardsPage} />
                                        <ProtectedRoute roles={['User', 'Admin']} path="/myPosts" component={MyPostsPage} />
                                        <ProtectedRoute roles={['Bank', 'Admin']} path="/insights" component={InsightsPage} />
                                        <ProtectedRoute roles={['Bank', 'Admin']} path="/createCampaign" component={CreateCampaignPage} />
                                        <ProtectedRoute roles={['User', 'Bank', 'Admin']} exact path="/" component={HomePage}/>
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
