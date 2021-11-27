import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'

export default class OfferComp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...props.data
		}
	}

    render() {
        return (
          <Card style={{ width: '15rem' }} >
            <Card.Img variant="top" src="../assets/TD-credit-card.jpg" style={{ width: '80%' }} className="rounded mx-auto d-block"/>
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