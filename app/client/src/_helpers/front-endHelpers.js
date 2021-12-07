import { Col, Row } from 'react-bootstrap';
export function renderRanOutOfCampaigns(campaignCards) {
    return (<div>
            <Row xs={3} md={3} lg={3} >
                {campaignCards.length === 0 ? <Col>Ran out of campaigns</Col>: campaignCards}
            </Row>
            </div>)
}

export function renderNoData(postsUnderCampaign) {
    return (<tbody>
            {postsUnderCampaign.length === 0 ? <tr><td className="text-center" colSpan={7}>No data</td></tr>: postsUnderCampaign}
            </tbody>)
}

export function renderDate(date) {
    return (<td>
            {new Date(date).toLocaleDateString({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </td>)
}