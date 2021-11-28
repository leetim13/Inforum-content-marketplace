import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Col, Row, Button, ButtonGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import OfferComp from '../_components/OfferComp';

class LandingPage extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Container className="page">

                <h1><i>Browse. Share. Earn Rewards.</i></h1>
                <h4><i>yes, it’s that simple :)</i></h4>

                <div class="offer-buttons" style={{padding: '5px'}}>
                <ToggleButtonGroup name="options" defaultValue={1} type="checkbox">
                    <ToggleButton id="offer-1" value={1} variant="outline-secondary">All Offers</ToggleButton>
                    <ToggleButton id="offer-2" value={2} variant="outline-secondary">Credit Cards</ToggleButton>
                    <ToggleButton id="offer-3" value={3} variant="outline-secondary">Bank Accounts</ToggleButton>
                    <ToggleButton id="offer-4" value={4} variant="outline-secondary">Articles</ToggleButton>
                    <ToggleButton id="offer-5" value={5} variant="outline-secondary">Videos</ToggleButton>
                </ToggleButtonGroup>
                </div>

                <div class="bank-buttons" style={{padding: '10px'}}>
                <ToggleButtonGroup name="options" defaultValue={1} type="checkbox">
                    <ToggleButton id="bank-1" value={1} variant="outline-dark">All Banks</ToggleButton>
                    <ToggleButton id="bank-2" value={2} variant="outline-dark">RBC</ToggleButton>
                    <ToggleButton id="bank-3" value={3} variant="outline-dark">CIBC</ToggleButton>
                    <ToggleButton id="bank-4" value={4} variant="outline-dark">BMO</ToggleButton>
                    <ToggleButton id="bank-5" value={5} variant="outline-dark">TD</ToggleButton>
                </ToggleButtonGroup>
                </div>
                
                <div>
                    <Row xs={3} md={3} lg={3} >
                        <Col style={{padding: '10px'}}><OfferComp/></Col>
                        <Col style={{padding: '10px'}}><OfferComp/></Col>
                        <Col style={{padding: '10px'}}><OfferComp/></Col>
                        <Col style={{padding: '10px'}}><OfferComp/></Col>
                        <Col style={{padding: '10px'}}><OfferComp/></Col>
                        <Col style={{padding: '10px'}}><OfferComp/></Col>
                    </Row>
                </div>
                <br></br>
                <br></br>
                <br></br>
 

            
            </Container>
        );
    }
}
function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedLandingPage = connect(mapStateToProps)(LandingPage);
export { connectedLandingPage as LandingPage }; 
export { LandingPage as LandingPagePlain }; 