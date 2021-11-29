import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import {Table} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import { postActions, alertActions } from '../_actions';

class MyPostsPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(postActions.getAll(this.props.user));
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