import React from "react";
import { connect } from 'react-redux';
import { Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import OfferComp from '../_components/OfferComp';
import { campaignActions, alertActions } from '../_actions';
import { renderRanOutOfCampaigns } from '../_helpers';
import { campaignService } from '../_services';

class LandingPage extends React.Component {

    // Could use this to get image if new campaign does not have one.
    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.userID !== prevState.userID) {
    //     console.log('userId changed');
    //  }
    
    constructor(props){
        super(props);
        this.state = {
            BankId: -1,
            type: "All"
        };
        this.handleOfferChange = this.handleOfferChange.bind(this);
        this.handleBankChange = this.handleBankChange.bind(this);
        this.renderRanOutOfCampaigns = renderRanOutOfCampaigns.bind(this);
    }

    async componentDidMount() {
        this.props.dispatch(campaignActions.getAll());
        const tmpCampaigns = await campaignService.getAllCampaignWithImages(this.props.campaigns)
        .catch(err => this.props.dispatch(alertActions.error(err.message)));
        this.props.dispatch(campaignActions.updateCampaigns(tmpCampaigns));
    }

    handleOfferChange(e){
        this.setState({ type: e });
    }

    handleBankChange(e){
        this.setState({ BankId: e });
    }

    render() {
        const campaignCards = this.props.campaigns
        .filter(c => (this.state.BankId === -1 || c.BankId === this.state.BankId) && (this.state.type === "All" || c.type === this.state.type))
        .slice(0, 6)
        .map((c, i) => <Col key={i} style={{padding: '10px'}}><OfferComp data={c}/></Col>)

        return (
            <Container className="page">

                <h1><i>Browse. Share. Earn Rewards.</i></h1>
                <h4><i>yes, it’s that simple :)</i></h4>

                <div className="offer-buttons" style={{padding: '5px'}}>
                    <ToggleButtonGroup name="offer-buttons-options" onChange={this.handleOfferChange} defaultValue={"All"} type="radio">
                        <ToggleButton id="offer-1" value={"All"} variant="outline-secondary">All Offers</ToggleButton>
                        <ToggleButton id="offer-2" value={"Product"} variant="outline-secondary">Products</ToggleButton>
                        <ToggleButton id="offer-3" value={"Charity"} variant="outline-secondary">Charity/Social/ESG</ToggleButton>
                        <ToggleButton id="offer-4" value={"Article"} variant="outline-secondary">Articles</ToggleButton>
                        <ToggleButton id="offer-5" value={"Other"} variant="outline-secondary">Other</ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <div className="bank-buttons" style={{padding: '10px'}}>
                    <ToggleButtonGroup name="bank-buttons-options" onChange={this.handleBankChange} defaultValue={-1} type="radio">
                        <ToggleButton id="bank-1" value={-1} variant="outline-dark">All Banks</ToggleButton>
                        <ToggleButton id="bank-2" value={1000000001} variant="outline-dark">RBC</ToggleButton>
                        <ToggleButton id="bank-3" value={1000000002} variant="outline-dark">TD</ToggleButton>
                        <ToggleButton id="bank-4" value={1000000003} variant="outline-dark">BMO</ToggleButton>
                        <ToggleButton id="bank-5" value={1000000004} variant="outline-dark">CIBC</ToggleButton>
                        <ToggleButton id="bank-6" value={1000000005} variant="outline-dark">Scotia</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                
                {this.renderRanOutOfCampaigns(campaignCards)}
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
