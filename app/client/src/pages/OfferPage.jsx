import React from 'react';
import { connect } from 'react-redux';
import { Image, Row, Col, Container, Card, Button} from 'react-bootstrap'
import OfferComp from '../_components/OfferComp';
import '../css/OfferPage.css';
import { alertActions } from '../_actions';
import { history } from '../_helpers';

class OfferPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: -1,
            bankId: -1,
			title: "",
			description: "",
            endDate: "",
		} // Change this after verifying redux campaigns are set up.
    }

    componentDidMount() {
        const result = this.props.campaigns.filter(c => parseInt(c.id) === parseInt(this.props.match.params.id));
        if (!Array.isArray(result) || result.length === 0) {
            // Could reload redux campaign object to check for updates
            this.props.dispatch(alertActions.error(`Cannot find campaign with id: ${this.props.match.params.id}`));
        } else {
            this.setState({
                ...result[0]
            });
        }
    }

    goToShareOffer() {
        let path = `/share/${this.state.id}`;
        history.push(path);
    }

    render() {
        const endDate = new Date(this.state.endDate)
        .toLocaleDateString({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        const campaignCards = this.props.campaigns
        .filter((c, i) => c.bankId === this.state.bankId && c.id !== this.state.id)
        .slice(0, 3)
        .map((c, i) => 
        <Col key={i} style={{paddingLeft: '20px', paddingRight: '20px'}}><OfferComp data={c}/></Col>
        );
        return (
            <Container className="page">
                <Row>
                    <Col xs={6} md={4} style={{padding: '40px'}}>
                    </Col>
                    <div className="card border-0">
                        <div className="card-horizontal">
                            <div className="img-square-wrapper">
                                <a alt="" href="" className="offer-bg">
                                <Image src="../assets/offer_bg.png"  />
                                <Image src="../assets/TD-credit-card.jpg" className="offer-image"/>
                                </a>
                            </div>
                            <div className="card-body"  style={{ paddingLeft: "50px", paddingBottom: "200px"}}>
                                <h4 className="card-title" align="left">{this.state.title}</h4>
                                <p className="card-text"  align="left">{this.state.description}</p>
                                <div align="left">
                                    <p className="card-text"  align="left"><i>Offer ends {endDate}. Conditions apply.</i></p>
                                    <Button className="share-button" variant="light" onClick={() => this.goToShareOffer()}>Share this offer!</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
                    

                <Row xs={3} md={3} lg={3}> 
                    {campaignCards}
                </Row>

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

const connectedOfferPage = connect(mapStateToProps)(OfferPage);
export { connectedOfferPage as OfferPage }; 