import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Col, Row, Button, ButtonGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import OfferComp from '../_components/OfferComp';
import { campaignActions, alertActions } from '../_actions';

class LandingPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(campaignActions.getAll());
    }

    // Could use this to get image if new campaign does not have one.
    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.userID !== prevState.userID) {
    //     console.log('userId changed');
    //  }
    
    constructor(props){
        super(props);
        this.state = {
            BankId: 1000000001,
            type:  "Charity",
        };
        this.handleOfferChange = this.handleOfferChange.bind(this);
        this.handleBankChange = this.handleBankChange.bind(this);
    }

    handleOfferChange(e){
        this.setState({ type: e });
    }

    handleBankChange(e){
        this.setState({ BankId: e });
    }

    render() {
        const type = this.state.type
        const BankId = this.state.BankId

        const campaignCards = this.props.campaigns.filter(campaign => (campaign.type == type && campaign.BankId === BankId)).slice(0, 6).map((c, i) => {
            return <Col key={i} style={{padding: '10px'}}><OfferComp data={c}/></Col>;
        });

        console.log(campaignCards);
        return (
            <Container className="page">

                <h1><i>Browse. Share. Earn Rewards.</i></h1>
                <h4><i>yes, it’s that simple :)</i></h4>

                <div className="offer-buttons" style={{padding: '5px'}}>
                <ToggleButtonGroup name="offer-buttons-options" onChange={this.handleOfferChange} defaultValue={1} type="radio">
                    <ToggleButton id="offer-1" value={1} variant="outline-secondary">All Offers</ToggleButton>
                    <ToggleButton id="offer-2" value={"Product"} variant="outline-secondary">Products</ToggleButton>
                    <ToggleButton id="offer-3" value={"Charity"} variant="outline-secondary">Charity/Social/ESG</ToggleButton>
                    <ToggleButton id="offer-4" value={"Article"} variant="outline-secondary">Articles</ToggleButton>
                    <ToggleButton id="offer-5" value={"Other"} variant="outline-secondary">Other</ToggleButton>
                </ToggleButtonGroup>
                </div>

                <div className="bank-buttons" style={{padding: '10px'}}>
                <ToggleButtonGroup name="bank-buttons-options" onChange={this.handleBankChange} defaultValue={10} type="radio">
                    <ToggleButton id="bank-1" value={10} variant="outline-dark">All Banks</ToggleButton>
                    <ToggleButton id="bank-2" value={1000000001} variant="outline-dark">RBC</ToggleButton>
                    <ToggleButton id="bank-3" value={1000000002} variant="outline-dark">TD</ToggleButton>
                    <ToggleButton id="bank-4" value={1000000003} variant="outline-dark">BMO</ToggleButton>
                    <ToggleButton id="bank-5" value={1000000004} variant="outline-dark">CIBC</ToggleButton>
                    <ToggleButton id="bank-6" value={1000000005} variant="outline-dark">Scotia</ToggleButton>
                </ToggleButtonGroup>
                </div>
                
                <div>
                    <Row xs={3} md={3} lg={3} >
                        {campaignCards}
                    </Row>
                </div>
            </Container>
        );
    }
}
function mapStateToProps(state) {
    const { authentication, campaigns } = state;
    const { user } = authentication;
    return {
        user,
        campaigns
    };
}

const connectedLandingPage = connect(mapStateToProps)(LandingPage);
export { connectedLandingPage as LandingPage }; 
export { LandingPage as LandingPagePlain }; 