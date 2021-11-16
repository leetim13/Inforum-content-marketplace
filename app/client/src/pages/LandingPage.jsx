import React, { useEffect, useState } from "react";
import { Col, Row, Button, ButtonGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import OfferComp from '../_components/OfferComp';

class LandingPage extends React.Component {
    render() {
        return (
            <Container>
            <div class="Landing Page">
                <h1><i>Browse. Share. Earn Rewards.</i></h1>
                <h4><i>yes, it’s that simple :)</i></h4>

                <div class="offer-buttons" style={{padding: '5px'}}>
                <ToggleButtonGroup name="options" defaultValue={1} type="radio">
                    <ToggleButton value={1} variant="outline-primary">All Offers</ToggleButton>
                    <ToggleButton value={2} variant="outline-primary">Credit Cards</ToggleButton>
                    <ToggleButton value={3} variant="outline-primary">Bank Accounts</ToggleButton>
                    <ToggleButton value={4} variant="outline-primary">Articles</ToggleButton>
                    <ToggleButton id="offer-5" value={5} variant="outline-primary">Videos</ToggleButton>
                </ToggleButtonGroup>
                </div>

                <div class="bank-buttons" style={{padding: '10px'}}>
                <ToggleButtonGroup name="options" defaultValue={1}>
                    <ToggleButton id="bank-1" value={1} variant="outline-secondary">All Banks</ToggleButton>
                    <ToggleButton id="bank-2" value={2} variant="outline-secondary">RBC</ToggleButton>
                    <ToggleButton id="bank-3" value={3} variant="outline-secondary">CIBC</ToggleButton>
                    <ToggleButton id="bank-4" value={4} variant="outline-secondary">BMO</ToggleButton>
                    <ToggleButton id="bank-5" value={5} variant="outline-secondary">TD</ToggleButton>
                </ToggleButtonGroup>
                </div>

                    <Row xs={3} md={3} lg={3} >
                        <Col style={{padding: '10px'}}><OfferComp/></Col>
                        <Col style={{padding: '10px'}}><OfferComp/></Col>
                        <Col style={{padding: '10px'}}><OfferComp/></Col>
                        <Col style={{padding: '10px'}}><OfferComp/></Col>
                        <Col style={{padding: '10px'}}><OfferComp/></Col>
                        <Col style={{padding: '10px'}}><OfferComp/></Col>
                    </Row>
            </div>
            
            </Container>
        );
    }
}

export { LandingPage as LandingPage }; 