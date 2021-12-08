import React from "react";
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import { campaignActions, alertActions } from '../_actions';
import { Http, renderNoData, renderDate } from '../_helpers';

class MyCampaignsPage extends React.Component {
    constructor(props){
        super(props);
        this.renderNoData = renderNoData.bind(this);
        this.renderDate = renderDate.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(campaignActions.getAllByBank(this.props.user.id));
    }

    async generateInsights() {
        await Http.post(`/insights/generate`)
        .then(res => this.props.dispatch(alertActions.success("Generated successfully!")))
        .catch(err => this.props.dispatch(alertActions.error("Generate failed: " + err.message)));
    }

    async closeCampaign(id) {
        await Http.patch(`/campaigns/${id}/close`)
        .then(res => this.props.dispatch(alertActions.success("Successfully closed campaign!")))
        .catch(err =>  {
            console.log(err);
            this.props.dispatch(alertActions.error("Encountered some error when closing campaign: " + err.message))
        });
    }

    render() { // TODO: Status checks, needs to involve current budget status too.
        const campaigns = this.props.campaigns.map((c, i) => 
            <tr key={i}>
                <td><a href={"/offer/" + c.id}>{c.title}</a></td>
                <td>{c.type}</td>

                {this.renderDate(c.startDate)}
                {this.renderDate(c.endDate)}
                {/* <td>
                    {new Date(c.startDate).toLocaleDateString({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </td>
                <td>
                    {new Date(c.endDate).toLocaleDateString({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </td> */}
                <td style={{ color: 'green' }}>{new Date(c.endDate) >= new Date() ? "Ongoing" : "Ended" }</td>
                <td><a href={"/insights/" + c.id}>Link</a></td>
                <td><Button variant="secondary" disabled={new Date(c.endDate) >= new Date() ? true : false } onClick={async () => await this.closeCampaign(c.id)}>Close</Button></td>
            </tr>
        )
        // Bank in header is not neccessary.
        return (
            <div className="page">
                <h1 align="left" style={{padding: '10px'}} >Welcome to My Campaigns, {this.props.user.role === "Admin" ? this.props.user.firstName : this.props.user.name}!</h1>
                <Container>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Campaign</th>
                                <th>Offer Type</th>
                                <th>Posted On</th>
                                <th>Expires On</th>
                                <th>Status</th>
                                <th>Link to Campaign Insights</th>
                                <th>Close Campaign</th>
                            </tr>
                        </thead>
                        {this.renderNoData(campaigns)}
                    </Table>
                    <Button variant="secondary" onClick={async () => await this.generateInsights()}>Generate Insights</Button>
                </Container>
                
            </div>
            
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

const connectedCampaignsPage = connect(mapStateToProps)(MyCampaignsPage);
export { connectedCampaignsPage as MyCampaignsPage }; 
