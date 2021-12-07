import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Form, FormGroup, InputGroup, Button, FormControl } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import OfferComp from '../_components/OfferComp';
import { history, Http, filterCampaigns } from '../_helpers'
import { postActions, alertActions } from '../_actions';

class ShareOfferPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: -1,
            postUrl: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.baseClientUrl = process.env.REACT_APP_SERVER_URL ? "https://inforum-client.herokuapp.com" : "localhost:3000";
        this.handleCopy = this.handleCopy.bind(this);
        this.handlePaste = this.handlePaste.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.filterCampaigns = filterCampaigns.bind(this);
    }

    componentDidMount() {
        // const result = this.props.campaigns.filter(c => parseInt(c.id) === parseInt(this.props.match.params.id));
        const result = this.filterCampaigns(this.props);
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
            '^https:\/\/www.facebook.com\/.*$'
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
        Http.post(`/posts`, { url: this.state.postUrl, platform: "facebook", CampaignId: this.state.id, UserId: this.props.user.id })
            .then(res => {
                this.props.dispatch(postActions.updatePosts([...this.props.posts, res.data]));
                history.push(`/verify/${res.data.id}`);
            })
            .catch(err => this.props.dispatch(alertActions.error(err.response.data.message)))
    }

    handleCopy(){
        navigator.clipboard.writeText(`${this.baseClientUrl}/linkRedirect/${this.props.user.id}/${this.props.match.params.id}`)
    }

    handlePaste(){
        navigator.clipboard.readText().then(data => this.setState({ postUrl: data }))
    }

    handleChange(e){
        this.setState({ postUrl: e.target.value })
    }

    render() {
        const formData = [
            {
                name: "formCampaignUrl",
                description: "Copy this auto-generated link from our partner below and make sure to include " + 
                "this link in your social media post.",
                text: "Offer URL",
                readOnly: true,
                button_text: "Copy",
                defaultValue: `${this.baseClientUrl}/linkRedirect/${this.props.user.id}/${this.props.match.params.id}`,
                onClickAction: this.handleCopy,
            },
            {
                name: "formPostUrl",
                description: "Feel free to add anything else you would like your friends to know! " +
                "Once you are done, paste back your post URL below.",
                text: "Post URL",
                readOnly: false,
                placeholder: "i.e., https://facebook.com/username/posts/abc123...",
                button_text: "Paste",
                onClickAction: this.handlePaste,
                value: this.state.postUrl,
                onChangeAction: this.handleChange
            }
        ]

        return (
            <div className="page">
                <h1 align="left" style={{padding: '10px'}} >One last step, you are almost there!</h1>
                <Form onSubmit={this.handleSubmit}>

                    {formData.map((formType) => (
                        <Form.Group key={formType} controlId={formType.name} >
                            <Form.Label>
                                <h5 align="left" style={{padding: '10px'}}>
                                    {formType.description}
                                </h5>
                            </Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-sm">{formType.text}</InputGroup.Text>
                                <Form.Control readOnly={formType.readOnly} defaultValue={formType.defaultValue} 
                                placeholder={formType.placeholder} onChange={formType.onChangeAction}
                                value={formType.value}/>
                                <Button variant="outline-secondary" id="button-addon2" onClick={formType.onClickAction}>
                                    {formType.button_text}
                                </Button>
                            </InputGroup>
                        </Form.Group>
                    ))}

                    <Form.Group> 
                        <Form.Label>
                            <h5 align="left" style={{padding: '10px'}}>Once we have verified your post, check back later to see how 
                            much Rewards you have gained!</h5>
                        </Form.Label>
                    </Form.Group>
                    <div style={{ display: "flex" }}>
                            <Button variant="outline-secondary" style={{ marginRight: "auto" }} type="submit">Verify Post!</Button>
                    </div>
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
