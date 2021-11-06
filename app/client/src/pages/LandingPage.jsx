import React from 'react';
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import OfferComp from '../_components/OfferComp';

class LandingPage extends React.Component {
    render() {
        return (
            <div className="Landing Page">
                <p>This is the landing page</p>
                <OfferComp/>
            </div>
            
            
        );
    }
}

export { LandingPage as LandingPage }; 