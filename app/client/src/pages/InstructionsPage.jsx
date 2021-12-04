import React from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { PersonCircle, Search, ShareFill, CashCoin} from 'react-bootstrap-icons';
class InstructionsPage extends React.Component {
    constructor(props){
        super(props);
    }
   

    render() {
        const data = [
            {
              logo: <PersonCircle />,
              title: "Sign up for FREE today",
              text: "Everyone can sign up - you DON’T have to be an influencer! " +
              "Inforum believes that everyone can leverage their own social network to earn rewards."
            },
            {
              logo: <Search/>,
              title: "Browse all available Campaigns ",
              text: " Campaigns can range from credit cards, " +
              "news articles, or even videos! Simply choose the offers that you believe your " +
              "friends may be interested in."
            },
            {
                logo: <ShareFill />,
                title: "Share it on social media",
                text: " Once you have chosen on a campaign, simply hit the Share button and follow the instructions. " +
                "We will then verify the post for you."
            },
            {
            logo: <CashCoin />,
            title: "Redeem your Rewards!",
            text: "Check My Rewards to see how much attention your post has gained. " +
            "Use these points to redeem gift cards of your choice!"
            }                          
          ];
          

        return (
            
            <Container className="page">
                
                <Row xs={1} md={2} className="g-4">
                {data.map((_) => (
                    <Col>
                    <Card style={{ textAlign: "left"}} >
                        <Card.Body>
                        <Card.Title>{_.logo} {_.title}</Card.Title>
                        <Card.Text>
                            {_.text}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
            </Row>
          
            <br></br>
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
