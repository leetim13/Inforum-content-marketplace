import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import {Row, Col, FormControl, Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import OfferComp from '../_components/OfferComp';
import Chart from 'chart.js/auto'

import { Line } from 'react-chartjs-2';
import faker from 'faker';

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };


  const labels = ['Nov 11', 'Nov 12', 'Nov 13', 'Nov 14', 'Nov 15', 'Nov 16', 'Nov 17'];

  export const data = {
    labels,
    datasets: [
      {
        label: 'Reward Points earned',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

class MyRewardsPage extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Container className="page">
                <h1 align="left" style={{padding: '10px'}} >Welcome to My Rewards, User123!</h1> 
                    <Row xs={3} md={3} lg={3}>
                        <Card border="light" >
                            <Card.Header>Total Posts</Card.Header>
                            <Card.Body>
                            <Card.Title><h1>20</h1></Card.Title>
                            <Card.Text>
                                <i>
                                    These are the total number of all verified posts you made.
                                </i>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        
                        <Card border="light" >
                            <Card.Header>Total Reward Points</Card.Header>
                            <Card.Body>
                            <Card.Title><h1>200</h1></Card.Title>
                            <Card.Text>
                                <i>
                                    These are all the reward points you have earned.
                                </i>
                            </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card border="light" >
                            <Card.Header>Ongoing Posts</Card.Header>
                            <Card.Body>
                            <Card.Title><h1>5</h1></Card.Title>
                            <Card.Text>
                                <i>
                                    These posts refer to campaigns that have not yet expired. 
                                </i>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                    <br/>
                    <Card>
                        <Card.Header>
                            <Card.Title><h4>Reward Points earned in the past 7 days</h4>
                            <p>as of {new Date().toLocaleString() + ""}</p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Line options={options} data={data} />;
                        </Card.Body>
                    </Card>


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

const connectedMyRewardsPage = connect(mapStateToProps)(MyRewardsPage);
export { connectedMyRewardsPage as MyRewardsPage }; 
export { MyRewardsPage as MyRewardsPagePlain }; 