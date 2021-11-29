import React from "react";
import { Row, Col, Form, Button, Image, Container, InputGroup, Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import { campaignActions, alertActions } from '../_actions';
import { Http, fileParser } from '../_helpers'

class CreateCampaignPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			url: "",
			type: "",
			description: "",
			image: null,
			startDate: "",
			endDate: "",
			allocatedCash: 0
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fileUploadInputChange = this.fileUploadInputChange.bind(this);
	}

	componentDidMount(){
		this.setState({ BankId: this.props.user.id });
	}

	formFieldValidation() {
        const startDate = new Date(this.state.startDate);
		const endDate = new Date(this.state.endDate);
		const today = new Date();
		const newErrors = {};
		if (startDate >= endDate) {
			newErrors.startDate = 'End date should be after start date.';
		}
		if (endDate <= today) {
			newErrors.endDate = 'End date should be in the future.';
		}
        return newErrors;
	}

	fileUploadInputChange(e) {
		const allowFileTypes = ["image/jpeg", "image/png"];
		const fileSizeLimit = 1024 * 1024 * 5;
		if (!allowFileTypes.includes(e.target.files[0].type)) {
			e.target.value = null;
			this.setState({ image: null });
			this.props.dispatch(alertActions.error("File not type of jpg or png."));
			return;
		}
		if (e.target.files[0].size > fileSizeLimit) { // Greater than 5mb
			e.target.value = null;
			this.setState({ image: null });
			this.props.dispatch(alertActions.error(`Image size should be smaller than 5MB.`));
			return;
		}
		
		fileParser(e, (e) => this.setState({ image: e.target.result }));
	}

    handleSubmit(e) {
		e.preventDefault();
		const fieldErrors = this.formFieldValidation();
		console.log(fieldErrors);
        if ( Object.keys(fieldErrors).length > 0 ) {
            // We got errors!
            this.props.dispatch(alertActions.error(fieldErrors))
            return;
        }

		console.log(this.state); 
		Http.post(`/campaigns`, this.state)
		.then(res => { 
			this.props.dispatch(campaignActions.updateCampaigns([...this.props.campaigns, res.data]));
			this.props.dispatch(alertActions.success("Campaign created successfully."));
		})
		.catch(err => this.props.dispatch(alertActions.error(err.response.data.message)))
    };

    render() {
        return (
            <div className="page">
                <h1 align="left" style={{padding: '10px'}} >Create a Campaign</h1>
                <Container>
                    <div align="left">
						<Form onSubmit={this.handleSubmit}>
							<Form.Group as={Row} className="mb-3" controlId="title">
								<Form.Label column sm={2}>
									Campaign Title
								</Form.Label>
								<Col sm={10}>
									<Form.Control type="text" onChange={e => this.setState({ title: e.target.value })} required/>
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3" controlId="url">
								<Form.Label column sm={2}>
									Campaign URL
								</Form.Label>
								<Col sm={10}>
									<Form.Control type="url" placeholder="Campaign URL"  onChange={e => this.setState({ url: e.target.value })} required/>
								{/* <Form.Control.Feedback type="invalid">
									Please provide a valid campaign URL (e.g., https://www.YourCampaignURL.com).
								</Form.Control.Feedback> */}
								</Col>
							</Form.Group>
					
							<Form.Group as={Row} className="mb-3" controlId="type">
								<Form.Label as="legend" column sm={2}>
									Camapign Type
								</Form.Label>
								<Col sm={10} onChange={e => this.setState({ type: e.target.value })}>
									<Form.Check
									type="radio"
									label="Product (credit cards, savings accounts, etc.)"
									name="campaignType"
									value="Product"
									id="campaignTypeProduct"
									defaultChecked
									/>
									<Form.Check
									type="radio"
									label="Charitable/Social/ESG events"
									name="campaignType"
									value="Charity"
									id="campaignTypeCharity"
									/>
									<Form.Check
									type="radio"
									label="Articles (news, press releases, etc.)"
									name="campaignType"
									value="Article"
									id="campaignTypeArticle"
									/>
									<Form.Check
									type="radio"
									label="Other"
									name="campaignType"
									value="Other"
									id="campaignTypeOther"
									/>
								</Col>
							</Form.Group>
							
							<Form.Group className="mb-3" controlId="description">
								<Form.Label>Campaign Description</Form.Label>
								<Form.Control as="textarea" rows={3} onChange={e => this.setState({ description: e.target.value })} required/>
								{/* <Form.Control.Feedback type="invalid">
									Please provide a valid campaign description.
								</Form.Control.Feedback> */}
							</Form.Group>
					
							<Form.Group controlId="image" className="mb-3">
								<Form.Label>Campaign Image</Form.Label>
								<br></br>
								<Form.Control type="file" onChange={this.fileUploadInputChange}/>
								{this.state.image && 
								<Row className="pt-3 pb-3">
									<Col sm={2}>
										<div>Image Preview:</div>
									</Col>
									<Col sm={10}>
										<Image style={{ width: '20%' }} src={this.state.image} alt={""} />
									</Col>
								</Row>}
							</Form.Group>
							
							<Form.Group className="mb-3" controlId="startDate">
								<Form.Label>Campaign Start Date</Form.Label>
								<Form.Control type="date" placeholder="campaign start date" onChange={e => this.setState({ startDate: e.target.value })} required/>
								{/* <Form.Control.Feedback type="invalid">
									Please provide a valid campaign start date.
								</Form.Control.Feedback> */}
							</Form.Group>
					
							<Form.Group className="mb-3" controlId="endDate">
								<Form.Label>Campaign End Date</Form.Label>
								<Form.Control type="date" placeholder="campaign end date" onChange={e => this.setState({ endDate: e.target.value })} required/>
								{/* <Form.Control.Feedback type="invalid">
									Please provide a valid campaign end date.
								</Form.Control.Feedback> */}
							</Form.Group>
					
							<Form.Group className="mb-3" controlId="allocatedCash">
								<Form.Label>Maximum Campaign Budget (in $CAD)</Form.Label>
								<Form.Control type="number" placeholder="Campaign Budget (in $CAD)" onChange={e => this.setState({ allocatedCash: e.target.value })} required/>
								{/* <Form.Control.Feedback type="invalid">
									Please provide a valid Campaign Budget (in $CAD).
								</Form.Control.Feedback> */}
								<i>*Maximum Campaign Budget refers to the maximum budget allocated for this specific campaign.
									If the # of clicks (converted to $) surpassed this budget, we will close this campaign for you automatically!
								</i>
							</Form.Group>
							
							<Button type="submit" variant="secondary">Create Campaign</Button>
						</Form>
                    </div>
                </Container>
            </div>
            
        );
    }
}

function mapStateToProps(state) {
	const { authentication, campaigns } = state;
	const { user } = authentication;
	return {
		user,
		campaigns
	};
}

const connectedCreateCampaignPage = connect(mapStateToProps)(CreateCampaignPage);
export { connectedCreateCampaignPage as CreateCampaignPage }; 