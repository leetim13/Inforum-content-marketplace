import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Http } from '../_helpers';
import { alertActions } from '../_actions';

export default class OfferComp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...props.data
		}
	}

	async componentDidMount() {
		await Http.get(`/campaigns/${this.state.id}/image`)
		.then(res => { 
			this.setState({
				image: res.data
			})
		})
		.catch(err => this.props.dispatch(alertActions.error(err.message)));
	}

    render() {
        return (
          <Card style={{ width: '15rem' }} >
			  {/* src="../assets/TD-credit-card.jpg" */}
            <Card.Img variant="top" src={`data:image/png;base64,${this.state.image}`} style={{ width: '80%' }} className="rounded mx-auto d-block"/>
            <Card.Body>
				<Card.Title>{this.state.title}</Card.Title>
				<Card.Text style={{textAlign: "left"}}>
					{this.state.description}
				</Card.Text>
				<Button variant="light" className="float-start" href={`/offer/${this.state.id}`}>Learn More</Button>
            </Card.Body>
          </Card>
        )
    }
}