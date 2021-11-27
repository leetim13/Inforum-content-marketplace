import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import {InputGroup, Button, FormControl } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import OfferComp from '../_components/OfferComp';

class VerifyOfferPage extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="page">
                <h1 align="left" style={{padding: '10px'}} >Congratulations, your post has been verified!</h1>
                <h5 align="left" style={{padding: '10px'}}>Please feel free to browse other offers or monitor your 
                Rewards page to see how much points you have accumulated for each post!</h5>
                <h5 align="left" style={{padding: '10px', fontStyle: 'italic'}}>Note that we will calculate your rewards once the offer has expired. 
                This will be calculated by the total number of clicks your post has attracted before the offer expiration date. 
                It might take us 3-5 business days before the rewards show up on your Rewards page.</h5>
                <p align="left" style={{padding: '10px', fontStyle: 'italic'}}>
                Contact us if you have any questions!</p>
            </div>
            
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

const connectedVerifyOfferPage = connect(mapStateToProps)(VerifyOfferPage);
export { connectedVerifyOfferPage as VerifyOfferPage }; 
