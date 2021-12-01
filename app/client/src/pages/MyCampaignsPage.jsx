import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import {Table} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import { campaignActions, alertActions } from '../_actions';

class MyCampaignsPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(campaignActions.getAllByBank(this.props.user.id));
    }

    render() { // TODO: Status checks, needs to involve current budget status too.
        const campaigns = this.props.campaigns.map((c, i) => 
            <tr key={i}>
                <td><a href={"/offer/" + c.id}>{c.title}</a></td>
                <td>{c.type}</td>
                <td>
                    {new Date(c.startDate).toLocaleDateString({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </td>
                <td>
                    {new Date(c.endDate).toLocaleDateString({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </td>
                <td style={{ color: 'green' }}>{new Date(c.endDate) >= new Date() ? "Ongoing" : "Ended" }</td>
                <td><a href={"/insights/" + c.id}>Link</a></td>
            </tr>
        )
        // Bank in header is not neccessary.
        return (
            <div className="page">
                <h1 align="left" style={{padding: '10px'}} >Welcome to My Campaigns, RBC!</h1>
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
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.length === 0 ? <tr><td className="text-center" colSpan={7}>No data</td></tr>: campaigns}
                        </tbody>
                        </Table>
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
export { MyCampaignsPage as CampaignsPagePlain }; 