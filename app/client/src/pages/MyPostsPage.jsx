import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import { postActions, alertActions } from '../_actions';
import { Http } from '../_helpers';

class MyPostsPage extends React.Component {
    constructor(props){
        super(props);
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
                <td><a href={"/offer/" + p.Campaign.id}>{p.Campaign.title}</a></td>
                <td>{p.Campaign.type}</td>
                <td>{p.Campaign.Bank.name}</td>
                <td>
                    {new Date(p.createdAt).toLocaleDateString({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </td>
                <td>
                    {new Date(p.Campaign.endDate).toLocaleDateString({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </td>
                <td style={{ color: 'green' }}>{new Date(p.Campaign.endDate) >= new Date() ? "Ongoing" : "Completed" }</td> 
                <td><a href={p.url}>Link</a></td>
            </tr>
        )
        return (
            <div className="page">
                <h1 align="left" style={{padding: '10px'}} >Welcome to My Posts, {this.props.user.firstName}!</h1>
                <Container>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Offer</th>
                                <th>Offer Type</th>
                                <th>Bank</th>
                                <th>Posted On</th>
                                <th>Expires On</th>
                                <th>Status</th>
                                <th>Link to post</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.length === 0 ? <tr><td className="text-center" colSpan={7}>No data</td></tr>: posts}
                        </tbody>
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
export { MyPostsPage as MyPostsPagePlain }; 