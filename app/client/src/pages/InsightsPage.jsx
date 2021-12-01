import React, { useEffect, useState } from "react";
import {Row, Col, FormControl, Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import OfferComp from '../_components/OfferComp';
import { connect } from 'react-redux';
import { alertActions, postActions } from '../_actions';
import { Http } from '../_helpers';

import Chart from 'chart.js/auto'
import { Pie, Line, Doughnut } from 'react-chartjs-2';

//line chart for total clicks per day
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

class InsightsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          posts: [],
		  campaign: {
			  title: ""
		  }
        }
    }

    async componentDidMount() {		
		const currentCampaign = this.props.campaigns.filter(c => parseInt(c.id) === parseInt(this.props.match.params.id));
		if (currentCampaign === []) {
			this.props.dispatch(alertActions.error(`Cannot find campaign with id: ${this.props.match.params.id}`))
		} else {
			this.setState({ campaign: currentCampaign[0] });
		}
		await Http.get(`/campaigns/${this.props.match.params.id}/posts`)
		.then(res => {
            this.setState({
                posts: res.data
            })
        })
		.catch(err => this.props.dispatch(alertActions.error(`Cannot find user: ${err.message}`)));
	}

    render() {
		const today = new Date();
        const dateObject = {};
        const dateLabels = [-6, -5, -4, -3, -2, -1, 0].map((offset) => {
            const date = new Date();
            date.setDate(today.getDate() + offset);
			dateObject[date.toLocaleDateString({ month: 'long', day: 'numeric' })] = {};
            dateObject[date.toLocaleDateString({ month: 'long', day: 'numeric' })].numClicks = 0;
			dateObject[date.toLocaleDateString({ month: 'long', day: 'numeric' })].numLikes = 0;
            return date.toLocaleDateString({ month: 'long', day: 'numeric' });
        });
        const posts = this.state.posts;
		for (let i = 0; i < posts.length; i++) {
			const insights = posts[i].DailyInsights;
			for (let j = 0; j < insights.length; j++) {
				const curDate = new Date(insights[j].date).toLocaleDateString({ month: 'long', day: 'numeric' });
				if (curDate in dateObject) {
					dateObject[curDate].numClicks += insights[j].numClicks;
					dateObject[curDate].numLikes += insights[j].numLikes;
				}
			}
		}
        const clicksDataset = {
            labels: dateLabels,
            datasets: [
                {
                    label: '# of clicks',
                    data: Object.keys(dateObject).map(function(key) {
                        return dateObject[key].numClicks;
                    }),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ]
        }

		const likesDataset = {
            labels: dateLabels,
            datasets: [
                {
                    label: '# of likes',
                    data: Object.keys(dateObject).map(function(key) {
                        return dateObject[key].numLikes;
                    }),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ]
        }

		const genderLabels = ['Male', 'Female', 'Other'];
		const genderObject = {'Male': 0, 'Female': 0, 'Other': 0};
		const agePartition = [0, 18, 28, 38, 48, 58];
		const ageLabels = [];
		const ageObject = {};
		let hasData = false;
		for (let i = 0; i < agePartition.length; i++) {
			let key = `${agePartition[i]}+`;
			if (i !== agePartition.length - 1) {
				key = `${agePartition[i]}-${agePartition[i + 1]}`;
			}
			ageLabels.push(key);
			ageObject[key] = 0;
		}

		for (let i = 0; i < posts.length; i++) {
			const age = posts[i].User.age;
			genderObject[posts[i].User.gender] += 1;
			hasData = true;
			for (let j = 0; j < agePartition.length; j++) {
				if (j === agePartition.length - 1 || (agePartition[j] <= age && agePartition[j + 1] > age)) {
					ageObject[ageLabels[j]] += 1;
					break;
				}
			}
		}
		const ageDataset = {
            labels: ageLabels,
            datasets: [
                {
                    label: '# of clicks',
                    data: Object.keys(ageObject).map(function(key) {
                        return ageObject[key];
                    }),
                    backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)',
					  ],
					  borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)',
					  ],
                }
            ]
        };
		const genderDataset = {
			labels: genderLabels,
			datasets: [
			  {
				label: '# of Votes',
				data: Object.keys(genderObject).map(function(key) {
					return genderObject[key];
				}),
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
        return (
          <Container className="page">
            <h1 align="left" style={{padding: '10px'}} >Campaign Insights for: {this.state.campaign.title}</h1>            
            <Row xs={2} md={2} lg={2}>
              <Card>
                <h5>Campaign Shares by Gender</h5>
                  <Card.Body style={{ height: '40vh' }}>
					  {hasData ? <Pie data={genderDataset}/> : <div >Has no data</div>}
                  </Card.Body>
              </Card>
              <Card>
              <h5>Campaign Shares by Age Group</h5>
                  <Card.Body>
                      {hasData ? <Doughnut data={ageDataset} /> : <div>Has no data</div>}
                  </Card.Body>
              </Card>

            </Row>
            <Card>
				<h5>Total Clicks in last 7 days</h5>
				<Card.Body>
					<Line data={clicksDataset} />
				</Card.Body>
			</Card>
			<Card>
				<h5>Total likes in last 7 days</h5>
				<Card.Body>
					<Line data={likesDataset} />
				</Card.Body>
			</Card>
            <br/><br/><br/>
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

const connectedInsightsPage = connect(mapStateToProps)(InsightsPage);
export { connectedInsightsPage as InsightsPage }; 
