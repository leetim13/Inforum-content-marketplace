import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'

export default class OfferComp extends Component {
    render() {
        return (
          <Card style={{ width: '15rem' }} >
            <Card.Img variant="top" src="TD-credit-card.jpg" style={{ width: '80%' }} className="rounded mx-auto d-block"/>
            <Card.Body>
              <Card.Title>TD Credit Card</Card.Title>
              <Card.Text style={{textAlign: "left"}}>
                TD® Aeroplan® Visa Infinite* Credit Card. Earn up to $1,250 in value in the first year.
              </Card.Text>
              <Button variant="light" className="float-start">Learn More</Button>
            </Card.Body>
          </Card>
        )
    }
}