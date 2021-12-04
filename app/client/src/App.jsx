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
import { LoginPage } from './pages/LoginPage';
import { InstructionsPage } from './pages/InstructionsPage';
import { LandingPage } from './pages/LandingPage';
import { OfferPage } from './pages/OfferPage';
import { ShareOfferPage } from './pages/ShareOfferPage';
import { VerifyOfferPage } from './pages/VerifyOfferPage';
import { MyRewardsPage } from './pages/MyRewardsPage';
import { MyPostsPage } from './pages/MyPostsPage';
import { MyCampaignsPage } from './pages/MyCampaignsPage';
import { InsightsPage } from './pages/InsightsPage';
import { CreateCampaignPage } from './pages/CreateCampaignPage';
import { SignUpPage } from './pages/SignUpPage';
import { LinkRedirectPage } from './pages/LinkRedirectPage';
import { UnauthorizedPage } from "./pages/Unauthorized";

import { NavBarComp } from "./_components/NavBarComp";
import NavBarFooterComp from "./_components/NavBarFooterComp"

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
        if (alert.message) {
            if (typeof alert.message === 'string') {
                alertElement = (<Alert variant={alert.type}>
                    {alert.message}
                </Alert>);
            } else if (typeof alert.message === 'object') {
                const messages = [];
                let i = 1;
                for (const key in alert.message) {
                    messages.push(<li>{alert.message[key]}</li>)
                    i += 1;
                }
                alertElement = 
                (<Alert variant={alert.type} style={{ textAlign: "left" }}>
                    <Alert.Heading>{alert.type === 'success' ? "Success messages" : "Error messages"}</Alert.Heading>
                    <ol>
                        {messages}
                    </ol>
                </Alert>);
            }
            window.scrollTo(0, 0);
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
                                    <Route path="/signup" component={SignUpPage} />
                                    <Route path="/linkRedirect/:userId/:campaignId" component={LinkRedirectPage} />
                                    <Route path="/unauthorized" component={UnauthorizedPage}/>
                                    <Route exact path="/" component={LandingPage}/>
                                    <ProtectedRoute roles={['User', 'Admin']} path="/share/:id" component={ShareOfferPage} />
                                    <ProtectedRoute roles={['User', 'Admin']} path="/verify/:id" component={VerifyOfferPage} />
                                    <ProtectedRoute roles={['User', 'Admin']} path="/myRewards" component={MyRewardsPage} />
                                    <ProtectedRoute roles={['User', 'Admin']} path="/myPosts" component={MyPostsPage} />
                                    <ProtectedRoute roles={['Bank', 'Admin']} path="/insights/:id" component={InsightsPage} />
                                    <ProtectedRoute roles={['Bank', 'Admin']} path="/createCampaign" component={CreateCampaignPage} />
                                    <ProtectedRoute roles={['Bank', 'Admin']} path="/myCampaigns" component={MyCampaignsPage} />
                                    <ProtectedRoute roles={['User', 'Bank', 'Admin']} path="/offer/:id" component={OfferPage} />
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