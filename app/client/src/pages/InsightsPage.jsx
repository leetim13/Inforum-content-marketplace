import React, { useEffect, useState } from "react";
import {Row, Col, FormControl, Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import OfferComp from '../_components/OfferComp';
import { connect } from 'react-redux';

import Chart from 'chart.js/auto'
import { Pie, Line } from 'react-chartjs-2';
import faker from 'faker';

// // pie chart for gender
export const genderData = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [
      {
        label: '# of Votes',
        data: [40, 58, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

//line chart for total clicks per day
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const clicksData = {
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

class InsightsPage extends React.Component {
    constructor(props){
        super(props);
    }



    render() {
        return (
          <Container>
            <h1 align="left" style={{padding: '10px'}} >Campaign Insights for: RBC-credit-card-0123</h1>            
            <Row xs={2} md={2} lg={2}>
              <Card>
                <h5>Total Reward Points by Gender</h5>
                  <Card.Body>
                      <Pie data={genderData}/>
                  </Card.Body>
              </Card>
              <Card>
              <h5>Total Reward Points by Age Group</h5>
                  <Card.Body>
                      <Pie data={genderData} />
                  </Card.Body>
              </Card>

              <Card>
              <h5>Total Reward Points per Day</h5>
                  <Card.Body>
                      <Line data={clicksData} />
                  </Card.Body>
              </Card>

              <Card>
              <h5>Total Reward Points by Age Group</h5>
                  <Card.Body>
                      <Line data={clicksData} />
                  </Card.Body>
              </Card>

            </Row>
            <br/><br/><br/>
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

const connectedInsightsPage = connect(mapStateToProps)(InsightsPage);
export { connectedInsightsPage as InsightsPage }; 