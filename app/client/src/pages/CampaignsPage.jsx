import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import {Table} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import OfferComp from '../_components/OfferComp';


class CampaignsPage extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="page">
                <h1 align="left" style={{padding: '10px'}} >Welcome to My Campaigns, RBC!</h1>
                <Container>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Post ID </th>
                            <th>Offer Type</th>
                            <th>Bank</th>
                            <th>Posted On</th>
                            <th>Expires On</th>
                            <th>Status</th>
                            <th>Link to Campaign Insights</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>RBC-credit-card-347162</td>
                            <td>Promotion</td>
                            <td>RBC</td>
                            <td>11/02/2021</td>
                            <td>12/10/2021</td>
                            <td style={{ color: 'green' }}>Active</td>
                            <td><a href="/insights">Link</a></td>
                            </tr>

                           
                        </tbody>
                        </Table>
                </Container>
                
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

const connectedCampaignsPage = connect(mapStateToProps)(CampaignsPage);
export { connectedCampaignsPage as CampaignsPage }; 
export { CampaignsPage as CampaignsPagePlain }; 