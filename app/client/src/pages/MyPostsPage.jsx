import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import {Table} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import OfferComp from '../_components/OfferComp';
import ChartistGraph from "react-chartist";


class MyPostsPage extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <h1 align="left" style={{padding: '10px'}} >Welcome to My Posts, User123!</h1>
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
                            <th>Link to post</th>
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
                            <td><u>Link</u></td>
                            </tr>

                            <tr>
                            <td>RBC-article-34213</td>
                            <td>Article</td>
                            <td>RBC</td>
                            <td>11/02/2021</td>
                            <td>11/12/2021</td>
                            <td style={{ color: 'red' }}>Expired</td>
                            <td><u>Link</u></td>
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

const connectedMyPostsPage = connect(mapStateToProps)(MyPostsPage);
export { connectedMyPostsPage as MyPostsPage }; 