import React from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

class InstructionsPage extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Container>
            <Row md={2} style={{padding: '30px'}}> 
                <Col xs={2} style={{padding: '30px'}} >
                <Card style={{ textAlign: "left"}} >
                    <Card.Body>
                    <Card.Title> 1. Sign up for FREE today</Card.Title>
                    <Card.Text>
                        Everyone can sign up - you DON’T have to be an influencer! 
                        Inforum believes that everyone can leverage their own social network to earn rewards.
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>

                <Col xs={2} style={{ padding:"30px"}} >
                <Card style={{ width:"100%", textAlign: "left"}} >
                    <Card.Body>
                    <Card.Title> 2.  Browse all available Campaigns</Card.Title>
                    <Card.Text>                
                        Campaigns can range from credit cards, 
                        news articles, or even a YouTube video! Simply choose the offers that you believe your 
                        friends may be interested in.
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>

                <Col xs={2} style={{ padding:"30px"}} >
                <Card style={{ width:"100%", textAlign: "left"}} >
                    <Card.Body>
                    <Card.Title> 3. Share it on social media</Card.Title>
                    <Card.Text>                   
                        Once you have chosen on a campaign, simply hit the Share button and follow the instructions.
                        We will then verify the post for you.
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
                <Col xs={2} style={{ padding:"30px"}} >
                <Card style={{ width:"100%", textAlign: "left"}}>
                    <Card.Body>
                    <Card.Title> 4. Redeem your Rewards!</Card.Title>
                    <Card.Text>
                        Check My Posts to see how much attention your post has gained. Reward 
                        points will be calculated by the formula below.
                        Use these points to redeem gift cards of your choice!
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col> 
            </Row>
            <div>
                 <p><i><u>Terms and Conditions apply.</u></i></p>
            </div>
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

const connectedInstructionsPage = connect(mapStateToProps)(InstructionsPage);
export { connectedInstructionsPage as InstructionsPage }; 