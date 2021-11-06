import React from 'react';
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

class InstructionsPage extends React.Component {
    render() {
        return (
            
            <Row md={2}> 
                <Col xs={2} >
                <Card style={{ width:"100%", height: "100%", textAlign: "left"}} >
                    <Card.Body>
                    <Card.Title> 1. Sign up for FREE today</Card.Title>
                    <Card.Text>
                        Everyone can sign up - you DON’T have to be an influencer! 
                        Inforum believes that everyone can leverage their own social network to earn rewards.
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>

                <Col xs={2} >
                <Card style={{ width:"100%", textAlign: "left",  marginLeft: "1rem"}} >
                    <Card.Body>
                    <Card.Title> 2.  Browse all available campaigns</Card.Title>
                    <Card.Text>                
                        Marketing campaigns can range from sharing credit cards promotions, 
                        news articles, or even just a YouTube video! Choose the offer that you believe your 
                        friends may be interested in. There is NO limit on how many offers you can share.
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>

                <Col xs={2} >
                <Card style={{ width:"100%", textAlign: "left",  marginTop: "5rem"}} >
                    <Card.Body>
                    <Card.Title> 3. Share it on social media</Card.Title>
                    <Card.Text>                   
                        Once you have chosen on a campaign, simply hit the Share button and you will
                        be re-directed to our sharing page. Remember to paste back your post URL after you
                        made the post for us to verify. RIght now, we only support Facebook posting.
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
                <Col xs={2} >
                <Card style={{ width:"100%", textAlign: "left",  marginTop: "5rem",  marginLeft: "1rem"}} >
                    <Card.Body>
                    <Card.Title> 4. Check back later and redeem Rewards!</Card.Title>
                    <Card.Text>
                        Check My Posts to see how much attention your post has gained. We will calculate your reward 
                        points based on the total number of clicks your post generated after the expiry date of eacg offer. 
                        Use these points to redeem gift cards of your choice.
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>



            </Row>
        );
    }
}

export { InstructionsPage as InstructionsPage }; 