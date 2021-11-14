import React, { useEffect, useState } from "react";
import {InputGroup, Button, FormControl } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import OfferComp from '../_components/OfferComp';

class ShareOfferPage extends React.Component {
    render() {
        return (
            <div>
                <h1 align="left" style={{padding: '10px'}} >One last step, you are almost there!</h1>
                <h5 align="left" style={{padding: '10px'}}>Copy this auto-generated link from our partner below and make sure to include
                 this link in your social media post. </h5>
                <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Offer URL</InputGroup.Text>
                    <FormControl
                    placeholder="https://www.rbcroyalbank.com/credit-cards/travel/rbc-avion-visa-infinite.html"/>
                    <Button variant="outline-secondary" id="button-addon2">Copy</Button>
                </InputGroup>

                <h5 align="left" style={{padding: '10px'}}>Feel free to add anything else you would like your friends to know!
                 Once you are done, paste back your post URL below.</h5>
                <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Post URL</InputGroup.Text>
                    <FormControl
                    placeholder="i.e., https://facebook.com/username/posts/abc123..."/>
                    <Button variant="outline-secondary" id="button-addon2">Paste</Button>
                </InputGroup>


                <h5 align="left" style={{padding: '10px'}}>Once we have verified your post, you can check back at your 
                Rewards page to see how many points you have gained! </h5>
                <div style={{ display: "flex" }}>
                    <Button variant="outline-secondary" style={{ marginRight: "auto" }} href="/verify">Verify Post!</Button>
                </div>

                <p><i><u>Terms and Conditions apply.</u></i></p>
                
            </div>
            
        );
    }
}

export { ShareOfferPage as ShareOfferPage }; 