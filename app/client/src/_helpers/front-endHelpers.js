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

export function filterCampaigns(this_props){
    return (
        this_props.campaigns.filter(c => parseInt(c.id) === parseInt(this_props.match.params.id))
    )
}

export function renderStatus(p) {
    return (<td style={{ color: p.isVerified ? 'green' : 'red' }}>
        {p.isVerified ? (new Date(p.Campaign.endDate) >= new Date() ? "Ongoing" : "Completed") : "Not verified" }
        </td> )
}

export function renderWelcomeMsg(msg, this_props) {
    return (<h1 align="left" style={{padding: '10px'}} >{msg}{this_props.user.firstName}!</h1>)
}