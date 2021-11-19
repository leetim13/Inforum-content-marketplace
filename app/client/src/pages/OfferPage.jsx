import React from 'react';
import { connect } from 'react-redux';
import { Image, Row, Col, Container, Card, Button} from 'react-bootstrap'
import OfferComp from '../_components/OfferComp';
import '../css/OfferPage.css';

class OfferPage extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col xs={6} md={4} style={{padding: '40px'}}>
                    </Col>
                    <div class="card border-0">
                        <div class="card-horizontal">
                            <div class="img-square-wrapper">
                                <a alt="" href="" className="offer-bg">
                                <Image src="../assets/offer_bg.png"  />
                                <Image src="../assets/TD-credit-card.jpg" className="offer-image"/>
                                </a>
                            </div>
                            <div class="card-body"  style={{ paddingLeft: "50px", paddingBottom: "200px"}}>
                                <h4 class="card-title" align="left">TD® Aeroplan® Visa Infinite* Credit Card</h4>
                                <p class="card-text"  align="left">Earn up to $1,250 in value in the first year. Conditions Apply. 
                                    Must apply by December 5, 2021</p>
                                <div align="left">
                                    <p class="card-text"  align="left"><i>Offer ends December 5, 2021. Conditions apply.</i></p>
                                    <Button className="share-button" variant="light" href="/share" >Share this offer!</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
                    

                    <Row xs={3} md={3} lg={3}> 
                        <Col style={{paddingLeft: '20px', paddingRight: '20px'}}><OfferComp/></Col>
                        <Col style={{paddingLeft: '20px', paddingRight: '20px'}}><OfferComp/></Col>
                        <Col style={{paddingLeft: '20px', paddingRight: '20px'}}><OfferComp/></Col>
                    </Row>

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

const connectedOfferPage = connect(mapStateToProps)(OfferPage);
export { connectedOfferPage as OfferPage }; 