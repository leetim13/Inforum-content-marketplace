import React from "react";
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import { postActions, alertActions } from '../_actions';
import { Http, renderNoData, renderDate, renderStatus, renderWelcomeMsg } from '../_helpers';

class MyPostsPage extends React.Component {
    constructor(props){
        super(props);
        this.renderNoData = renderNoData.bind(this);
        this.renderDate = renderDate.bind(this);
        this.renderStatus = renderStatus.bind(this);
        this.renderWelcomeMsg = renderWelcomeMsg.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(postActions.getAll(this.props.user));
    }

    async generateInsights() {
        await Http.post(`/insights/generate`)
        .then(res => this.props.dispatch(alertActions.success("Generated successfully!")))
        .catch(err => this.props.dispatch(alertActions.error("Generate failed: " + err.message)));
    }

    render() { // TODO: More status logic
        const posts = this.props.posts.map((p, i) => 
            <tr key={i}>
                {this.props.user.role === "Admin" ? <td>{p.User.firstName + " " + p.User.lastName}</td> : null}
                <td><a href={"/offer/" + p.Campaign.id}>{p.Campaign.title}</a></td>
                <td>{p.Campaign.type}</td>
                <td>{p.Campaign.Bank.name}</td>
                {this.renderDate(p.createdAt)}
                {this.renderDate(p.Campaign.endDate)}
                {this.renderStatus(p)}
                {/* <td style={{ color: p.isVerified ? 'green' : 'red' }}>{p.isVerified ? (new Date(p.Campaign.endDate) >= new Date() ? "Ongoing" : "Completed") : "Not verified" }</td>  */}
                <td><a href={p.url}>Link</a></td>
            </tr>
        )
        return (
            <div className="page">
                {this.renderWelcomeMsg("Welcome to My Posts, ", this.props)}
                {/* <h1 align="left" style={{padding: '10px'}} >Welcome to My Posts, {this.props.user.firstName}!</h1> */}
                <Container>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                {this.props.user.role === "Admin" ? <th>Posted by</th> : null}
                                <th>Offer</th>
                                <th>Offer Type</th>
                                <th>Bank</th>
                                <th>Posted On</th>
                                <th>Expires On</th>
                                <th>Status</th>
                                <th>Link to post</th>
                            </tr>
                        </thead>
                        {this.renderNoData(posts)}
                    </Table>
                </Container>
                {this.props.user.role === "Admin" 
                    ? <Button variant="secondary" onClick={async () => await this.generateInsights()}>Generate Insights</Button> 
                    : null}
            </div>
            
        );
    }
}

function mapStateToProps(state) {
    const { authentication, posts } = state;
    const { user } = authentication;
    return {
        user,
        posts
    };
}

const connectedMyPostsPage = connect(mapStateToProps)(MyPostsPage);
export { connectedMyPostsPage as MyPostsPage }; 
