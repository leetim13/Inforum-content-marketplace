import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Form, FormGroup, InputGroup, Button, FormControl } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import OfferComp from '../_components/OfferComp';
import { Http } from '../_helpers'
import { postActions, alertActions } from '../_actions';
import { history } from '../_helpers';

class ShareOfferPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: -1,
            postUrl: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const result = this.props.campaigns.filter(c => parseInt(c.id) === parseInt(this.props.match.params.id));
        if (!Array.isArray(result) || result.length === 0) {
            // Could reload redux campaign object to check for updates
            this.props.dispatch(alertActions.error(`Cannot find campaign with id: ${this.props.match.params.id}`));
        } else {
            this.setState({
                ...result[0]
            });
        }
    }

    formFieldValidation() {
        const postUrlRegex = new RegExp(
            '^https:\/\/www.facebook.com\/.*\/posts\/[0-9]+$'
         );
        const newErrors = {};
        const postUrl = this.state.postUrl;
        // name errors
        if ( !postUrl || postUrl.length === '' ) {
            newErrors.postUrl = 'Post Url cannot be blank!';
        }
        else if ( !postUrlRegex.test(postUrl) ) {
            newErrors.postUrl = 'We cannot recognize the url.';
        }
        return newErrors;
    }

    handleSubmit(e) {
        e.preventDefault();
        const fieldErrors = this.formFieldValidation();
        if ( Object.keys(fieldErrors).length > 0 ) {
            // We got errors!
            this.props.dispatch(alertActions.error(fieldErrors))
            return;
        } 
        Http.post(`/posts`, { url: this.state.postUrl, platform: "facebook", campaignId: this.state.id, userId: this.props.user.id })
            .then(res => { 
                this.props.dispatch(postActions.updatePosts([...this.props.posts, res.data]));
                history.push(`/verify/${res.data.id}`);
            })
            .catch(err => this.props.dispatch(alertActions.error(err.response.data.message)))
    }

    render() {
        return (
            <div className="page">
                <h1 align="left" style={{padding: '10px'}} >One last step, you are almost there!</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formCampaignUrl">
                        <Form.Label>
                            <h5 align="left" style={{padding: '10px'}}>Copy this auto-generated link from our partner below and make sure to include
                            this link in your social media post. </h5>
                        </Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">Offer URL</InputGroup.Text>
                            {/* <FormControl placeholder={this.campaignUrl} readOnly /> */}
                            <Form.Control readOnly defaultValue={this.state.url} />
                            <Button variant="outline-secondary" id="button-addon2" 
                            onClick={() => navigator.clipboard.writeText(this.state.url)}>
                                Copy
                            </Button>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formPostUrl">
                        <Form.Label>
                            <h5 align="left" style={{padding: '10px'}}>Feel free to add anything else you would like your friends to know!
                            Once you are done, paste back your post URL below.</h5>
                        </Form.Label>
                        <InputGroup className="mb-3" hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-sm">Post URL</InputGroup.Text>
                            <Form.Control type="text" value={this.state.postUrl} onChange={e => this.setState({ postUrl: e.target.value })} 
                            placeholder="i.e., https://facebook.com/username/posts/abc123..."/>
                            <Button variant="outline-secondary" id="button-addon2" 
                            onClick={() => navigator.clipboard.readText().then(data => this.setState({ postUrl: data }))}>
                                Paste
                            </Button>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group> 
                        <Form.Label>
                            <h5 align="left" style={{padding: '10px'}}>Feel free to add anything else you would like your friends to know!
                            Once you are done, paste back your post URL below.</h5>
                        </Form.Label>
                        <div style={{ display: "flex" }}>
                            <Button variant="outline-secondary" style={{ marginRight: "auto" }} type="submit">Verify Post!</Button>
                        </div>
                    </Form.Group>
                </Form>
                <p><i><u>Terms and Conditions apply.</u></i></p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, posts, campaigns } = state;
    const { user } = authentication;
    return {
        user,
        posts,
        campaigns
    };
}

const connectedShareOfferPage = connect(mapStateToProps)(ShareOfferPage);
export { connectedShareOfferPage as ShareOfferPage }; 