import React, { useEffect, useState } from "react";
import {Row, Col, FormControl, Card, Table } from 'react-bootstrap';
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
		let campaignId;
		if (this.props.user.role === "Admin") {
			campaignId = -1;
		} else {
			campaignId = this.props.match.params.id;
			const currentCampaign = this.props.campaigns.filter(c => parseInt(c.id) === parseInt(this.props.match.params.id));
			if (currentCampaign === []) {
				this.props.dispatch(alertActions.error(`Cannot find campaign with id: ${this.props.match.params.id}`))
			} else {
				this.setState({ campaign: currentCampaign[0] });
			}
		}
		
		await Http.get(`/campaigns/${campaignId}/posts`)
		.then(res => {
            this.setState({
                posts: res.data
            })
        })
		.catch(err => this.props.dispatch(alertActions.error(`Cannot find user: ${err.message}`)));
	}

	aggregateLast7Days(posts, metric) {
		const today = new Date();
        const dateObject = {};
        const dateLabels = [-6, -5, -4, -3, -2, -1, 0].map((offset) => {
            const date = new Date();
            date.setDate(today.getDate() + offset);
			dateObject[date.toLocaleDateString({ month: 'long', day: 'numeric' })] = {};
            dateObject[date.toLocaleDateString({ month: 'long', day: 'numeric' })].numMetrics = 0;
			// dateObject[date.toLocaleDateString({ month: 'long', day: 'numeric' })].numLikes = 0;
            return date.toLocaleDateString({ month: 'long', day: 'numeric' });
        });
        
		for (let i = 0; i < posts.length; i++) {
			const insights = posts[i].DailyInsights;
			for (let j = 0; j < insights.length; j++) {
				const curDate = new Date(insights[j].date).toLocaleDateString({ month: 'long', day: 'numeric' });
				if (curDate in dateObject) {
					if (metric == "clicks"){
						dateObject[curDate].numMetrics += insights[j].numClicks;
					}else{
						dateObject[curDate].numMetrics += insights[j].numLikes;
					}
				}
			}
		}

		const metricsDataset = {
            labels: dateLabels,
            datasets: [
                {
                    label: '# of ' + metric,
                    data: Object.keys(dateObject).map(function(key) {
                        return dateObject[key].numMetrics;
                    }),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ]
        }

		return { metricsDataset };
	}

	aggregateAgeGender(posts) {
		const agePartition = [0, 18, 28, 38, 48, 58];
		const ageLabels = [];
		const ageObject = {};
		const genderLabels = ['Male', 'Female', 'Other'];
		const genderObject = {'Male': 0, 'Female': 0, 'Other': 0};
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

		return { ageDataset, genderDataset, hasData };
	}

    render() {
		const posts = this.state.posts;
		const last7DaysClicksData = this.aggregateLast7Days(posts, "clicks");
		const last7DaysLikesData = this.aggregateLast7Days(posts, "likes");
		const ageGenderDataset = this.aggregateAgeGender(posts);
		
		const postsUnderCampaign = posts.map((p, i) => 
            <tr key={i}>
				<td>
					{p.User.firstName + " " + p.User.lastName}
				</td>
				<td>
					{p.User.age}
				</td>
				<td>
					{p.User.gender}
				</td>
                <td>
                    {new Date(p.createdAt).toLocaleDateString({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </td>
                <td style={{ color: p.isVerified ? 'green' : 'red' }}>{p.isVerified ? (new Date(p.Campaign.endDate) >= new Date() ? "Ongoing" : "Completed") : "Not verified" }</td> 
                <td><a href={p.url}>Link</a></td>
            </tr>
        )

		const cardDataCombined = [
			{
				title: "Campaign Shares by Gender",
				data: ageGenderDataset,
				dataset: ageGenderDataset.genderDataset,
				chartType: Pie
			},
			{
				title: "Campaign Shares by Age Group",
				data: ageGenderDataset,
				dataset: ageGenderDataset.ageDataset,
				chartType: Doughnut
			},
		]

		const cardDataSeparate = [
			{
				title: "Total Clicks in last 7 days",
				data: last7DaysClicksData,
				dataset: last7DaysClicksData.metricsDataset,
				chartType: Line
			},
			{
				title: "Total Likes in last 7 days",
				data: last7DaysLikesData,
				dataset: last7DaysLikesData.metricsDataset,
				chartType: Line
			},
		]

        return (
          <Container className="page">
            <h1 align="left" style={{padding: '10px'}} >{this.props.user.role === "Admin" ? "Site-wide Campaign Insights" : `Campaign Insights for: ${this.state.campaign.title}`}</h1>            
            
			<Row xs={2} md={2} lg={2}>
				{cardDataCombined.map((cardType) => (
					<Card>
						<h5>{cardType.title}</h5>
						<Card.Body style={{ height: '40vh' }}>
							{cardType.data.hasData ? <cardType.chartType data={cardType.dataset}/> : <div >Has no data</div>}
						</Card.Body>
					</Card>
				))}
			</Row>

			{cardDataSeparate.map((cardType) => (
					<Card>
						<h5>{cardType.title}</h5>
						<Card.Body>
							<cardType.chartType data={cardType.dataset}/> 
						</Card.Body>
					</Card>
			))}


			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Posted By</th>
						<th>Age</th>
						<th>Gender</th>
						<th>Posted On</th>
						<th>Status</th>
						<th>Link to post</th>
					</tr>
				</thead>
				<tbody>
					{postsUnderCampaign.length === 0 ? <tr><td className="text-center" colSpan={7}>No data</td></tr>: postsUnderCampaign}
				</tbody>
			</Table>
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
