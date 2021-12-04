import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import {Row, Col, FormControl, Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import { Http } from '../_helpers';
import { Line } from 'react-chartjs-2';
import { alertActions, postActions } from '../_actions';

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
  };

class MyRewardsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            insights: []
        }
    }

    async componentDidMount() {
        await Http.get(`/users/${this.props.user.id}/insights`)
        .then(res => {
            this.setState({
                insights: res.data
            })
        })
        .catch(err => this.props.dispatch(alertActions.error(`Cannot find user: ${err.message}`))); 

        this.props.dispatch(postActions.getAll(this.props.user));
    }

    render() {
        const today = new Date();
        const dataObject = {};
        const labels = [-6, -5, -4, -3, -2, -1, 0].map((offset) => {
            const date = new Date();
            date.setDate(today.getDate() + offset);
            dataObject[date.toLocaleDateString({ month: 'long', day: 'numeric' })] = 0;
            return date.toLocaleDateString({ month: 'long', day: 'numeric' });
        });
        const insights = this.state.insights;
        for (let i = 0; i < insights.length; i++) {
            const curDate = new Date(insights[i].date).toLocaleDateString({ month: 'long', day: 'numeric' });
            if (curDate in dataObject) {
                dataObject[curDate] += insights[i].rewardPoints;
            }
        }
        const dataset = {
            labels: labels,
            datasets: [
                {
                    label: '# of clicks gained',
                    data: Object.keys(dataObject).map(function(key) {
                        return dataObject[key];
                    }),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ]
        }

        let numOngoing = 0;
        for (let i = 0; i < this.props.posts.length; i++) {
            console.log(this.props.posts[i])
            if (new Date() <= new Date(this.props.posts[i].Campaign.endDate)){
                numOngoing += 1;
            }
        }

        return (
            <Container className="page">
                <h1 align="left" style={{padding: '10px'}} >Welcome to My Rewards, {this.props.user.firstName}!</h1> 
                    <Row xs={3} md={3} lg={3}>
                        <Card border="light" >
                            <Card.Header>Total Posts</Card.Header>
                            <Card.Body>
                            <Card.Title><h1>{this.props.posts.length}</h1></Card.Title>
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
                            <Card.Title><h1>{this.props.user.rewardPoint}</h1></Card.Title>
                            <Card.Text>
                                <i>
                                    These are all the reward points you have earned.<sup>1</sup> 
                                </i>
                            </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card border="light" >
                            <Card.Header>Ongoing Posts</Card.Header>
                            <Card.Body>
                            <Card.Title><h1>{numOngoing}</h1></Card.Title>
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
                            <Card.Title><h4>Total Clicks gained in the past 7 days</h4>
                            <p>as of {new Date().toLocaleString() + ""}</p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Line options={options} data={dataset} />
                        </Card.Body>
                    </Card>
                <p align="left"><i><sup>1</sup>Note that reward points will only be updated once a campaign has expired.</i></p>


                </Container>
                
            
        );
    }
}

function mapStateToProps(state) {
    const { authentication, posts } = state;
    const { user } = authentication;
    return {
        user,
        posts
    };
}

const connectedMyRewardsPage = connect(mapStateToProps)(MyRewardsPage);
export { connectedMyRewardsPage as MyRewardsPage }; 
