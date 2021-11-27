import React from "react";
import { Route, Switch } from 'react-router-dom';
import { Alert, Col, Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Sentry from '@sentry/react';

import { connect } from 'react-redux';

import { history } from './_helpers';
import { alertActions } from './_actions';
import { ProtectedRoute} from './_components';
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
import { CampaignsPage } from './pages/CampaignsPage';
import { InsightsPage } from './pages/InsightsPage';
import { CreateCampaignPage } from './pages/CreateCampaignPage';

import { NavBarComp } from "./_components/NavBarComp";
import NavBarFooterComp from "./_components/NavBarFooterComp"

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
        let alertElement;
        if (alert.message && typeof alert.message === 'string') {
            alertElement = (<Alert variant={alert.type}>
                {alert.message}
            </Alert>);
        } else if (alert.message && typeof alert.message === 'object') {
            const messages = [];
            let i = 1;
            for (const key in alert.message) {
                messages.push(i + ". " + alert.message[key])
                i += 1;
            }
            alertElement = 
            (<Alert variant={alert.type} style={{ textAlign: "left" }}>
                <Alert.Heading>{alert.type === 'success' ? "Success messages" : "Error messages"}</Alert.Heading>
                {messages}
            </Alert>);
        }
        return (
            <div className="App">               
                <Router history={history}>
                    <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
                        <NavBarComp/>
                        <Container>
                            <Col sm={{span: 8, offset: 2}}>
                                {alertElement}
                                <Switch>
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/instructions" component={InstructionsPage} />
                                    <Route path="/landing" component={LandingPage} />
                                    <ProtectedRoute roles={['User', 'Admin']} path="/offer/:id" component={OfferPage} />
                                    <ProtectedRoute roles={['User', 'Admin']} path="/share/:id" component={ShareOfferPage} />
                                    <ProtectedRoute roles={['User', 'Admin']} path="/verify/:id" component={VerifyOfferPage} />
                                    <ProtectedRoute roles={['User', 'Admin']} path="/myRewards" component={MyRewardsPage} />
                                    <ProtectedRoute roles={['User', 'Admin']} path="/myPosts" component={MyPostsPage} />
                                    <ProtectedRoute roles={['Bank', 'Admin']} path="/insights" component={InsightsPage} />
                                    <ProtectedRoute roles={['Bank', 'Admin']} path="/createCampaign" component={CreateCampaignPage} />
                                    <ProtectedRoute roles={['User', 'Bank', 'Admin']} exact path="/" component={HomePage}/>
                                </Switch>
                            </Col>
                        </Container>
                        <NavBarFooterComp/>
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
