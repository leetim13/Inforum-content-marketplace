import { Col, Row } from 'react-bootstrap';
export function renderRanOutOfCampaigns(campaignCards) {
    return (<div>
            <Row xs={3} md={3} lg={3} >
                {campaignCards.length === 0 ? <Col>Ran out of campaigns</Col>: campaignCards}
            </Row>
            </div>)
}
