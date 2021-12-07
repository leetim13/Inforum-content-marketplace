import React from 'react';
import { connect } from 'react-redux';
import { Image, Row, Col, Container, Card, Button} from 'react-bootstrap'
import OfferComp from '../_components/OfferComp';
import '../css/OfferPage.css';
import { alertActions, campaignActions } from '../_actions';
import { history } from '../_helpers';
import { Http, renderRanOutOfCampaigns } from '../_helpers';

class OfferPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: -1,
            bankId: -1,
			title: "",
			description: "",
            endDate: ""
		} // Change this after verifying redux campaigns are set up.
        this.renderRanOutOfCampaigns = renderRanOutOfCampaigns.bind(this);
    }

    async componentDidMount() {
        const result = this.props.campaigns.filter(c => parseInt(c.id) === parseInt(this.props.match.params.id));
        if (!Array.isArray(result) || result.length === 0) {
            // Could reload redux campaign object to check for updates
            this.props.dispatch(alertActions.error(`Cannot find campaign with id: ${this.props.match.params.id}`));
        } else {
            await Http.get(`/campaigns/${result[0].id}/image`)
            .then(res => {
                console.log(res);
                this.setState({
                    ...result[0],
                    image: res.data
                });
            })
            .catch(err => this.props.dispatch(alertActions.error(`get Campaign image failed: ${err}`)));

            const promises = [];
            const tmpCampaigns = [];
            for (let i = 0; i < this.props.campaigns.length; i++) {
                promises.push(Http.get(`/campaigns/${this.props.campaigns[i].id}/image`)
                .then(res => { 
                    tmpCampaigns.push({ ...this.props.campaigns[i], image: res.data })
                })
                .catch(err => this.props.dispatch(alertActions.error(err.message))));
            }
            await Promise.all(promises);
            this.props.dispatch(campaignActions.updateCampaigns(tmpCampaigns));
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
        .filter((c, i) => c.BankId === this.state.BankId && c.id !== this.state.id)
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
                                <Image className="offer-image" src={`data:image/png;base64,${this.state.image}`} alt={""} />
                                </a>
                            </div>
                            <div className="card-body" >
                                <h4 className="card-title" align="left">{this.state.title}</h4>
                                <div align="left">
                                    <p className="card-text"  align="left" >{this.state.description}
                                        <br/>
                                        <a className="card-text"  align="left" href={this.state.url}><u>Learn more.</u></a>
                                    </p>
                                </div>
                                <br/>
                                <br/>
                                <div align="left">
                                    <p className="card-text"  align="left"><i>Offer ends {endDate}. Conditions apply.</i></p>
                                    {this.props.user.role !== 'Bank' ? <Button className="share-button" variant="light" onClick={() => this.goToShareOffer()}>Share this offer!</Button> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
                <br/>    
                <br/>    

                {this.renderRanOutOfCampaigns(campaignCards)}
                
                <br/>    
                <br/>    
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
