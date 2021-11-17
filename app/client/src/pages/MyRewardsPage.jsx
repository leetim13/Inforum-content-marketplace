import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import {Row, Col, FormControl, Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import OfferComp from '../_components/OfferComp';
import ChartistGraph from "react-chartist";
import '../css/Dashboard.css';
// Data for Line Chart
var dataSales = {
    labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
    series: [
        [287, 385, 490, 492, 554, 586, 698, 695],
        [67, 152, 143, 240, 287, 335, 435, 437],
        [23, 113, 67, 108, 190, 239, 307, 308]
    ]
};
var optionsSales = {
    low: 0,
    high: 800,
    showArea: false,
    height: "245px",
    axisX: {
        showGrid: false,
    },
    lineSmooth: true,
    showLine: true,
    showPoint: true,
    fullWidth: true,
    chartPadding: {
        right: 50
    }
};
var responsiveSales = [
    ['screen and (max-width: 640px)', {
        axisX: {
            labelInterpolationFnc: function (value) {
                return value[0];
            }
        }
    }]
];

class MyRewardsPage extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <h1 align="left" style={{padding: '10px'}} >Welcome to My Rewards, User123!</h1>
                <Container>
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

            <Card>
            <Card.Header>
                <Card.Title><h4>Reward Points earned</h4>
                <p>as of Nov 12, 2021 22:45 EST</p>
                </Card.Title>
            </Card.Header>
            <Card.Body>
            <div className="ct-chart" id="chartHours">
                <ChartistGraph
                    data={dataSales}
                    type="Line"
                    options={optionsSales}
                    responsiveOptions={responsiveSales}/>
                </div>
            </Card.Body>
            <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Open <i className="fas fa-circle text-danger"></i>
                  Click <i className="fas fa-circle text-warning"></i>
                  Click Second Time
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>


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

const connectedMyRewardsPage = connect(mapStateToProps)(MyRewardsPage);
export { connectedMyRewardsPage as MyRewardsPage }; 