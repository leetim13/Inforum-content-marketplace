import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Image, Container, Modal, InputGroup} from 'react-bootstrap';
import { Http, fileParser } from '../_helpers';
import { connect } from 'react-redux';
import { alertActions } from '../_actions';
import { history } from '../_helpers';

class SignUpPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			username: "",
			password: "",
			profilePicture: null,
			firstName: "",
			lastName:"",
			age: 0,
			gender: "",
			role: "User",
			email: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
        this.fileUploadInputChange = this.fileUploadInputChange.bind(this);
	}

	formFieldValidation() {
        const newErrors = {};
        if (this.state.age < 0) {
            newErrors.age = "Age input is incorrect.";
        }
        return newErrors;
	}

	fileUploadInputChange(e) {
		const allowFileTypes = ["image/jpeg", "image/png"];
		const fileSizeLimit = 1024 * 1024 * 5;
		if (!allowFileTypes.includes(e.target.files[0].type)) {
			e.target.value = null;
			this.setState({ image: null });
			// this.props.dispatch(alertActions.error("File not type of jpg or png."));
			return;
		}
		if (e.target.files[0].size > fileSizeLimit) { // Greater than 5mb
			e.target.value = null;
			this.setState({ image: null });
			// this.props.dispatch(alertActions.error(`Image size should be smaller than 5MB.`));
			return;
		}
		
		fileParser(e, (e) => this.setState({ profilePicture: e.target.result }));
	}

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        const fieldErrors = this.formFieldValidation();
        if ( Object.keys(fieldErrors).length > 0 ) {
            // We got errors!
            this.props.dispatch(alertActions.error(fieldErrors))
            return;
        }

        Http.post(`/users`, this.state)
		.then(res => { 
            history.push('/login');
			this.props.dispatch(alertActions.success("Account signed up successfully."));
		})
		.catch(err => this.props.dispatch(alertActions.error(err.response.data.message)))
    };
   

	render() {
		return (
        <Container className="page">
            <h1 align="left" style={{padding: '10px'}} >Sign Up</h1>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="firstName">
                    <Form.Label as={Col} md="2">First name</Form.Label>
                    <Col>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            onChange={e => this.setState({ firstName: e.target.value })}
                        />
                    </Col>
                    {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="lastName">
                    <Form.Label as={Col} md="2">Last name</Form.Label>
                    <Col>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                            onChange={e => this.setState({ lastName: e.target.value })}
                        />
                    </Col>
                    {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="email">
                    <Form.Label as={Col} md="2">
                    Email
                    </Form.Label>
                    <Col >
                        <Form.Control type="email" placeholder="Email" required onChange={e => this.setState({ email: e.target.value })}/>
                        {/* <Form.Control.Feedback type="invalid">
                            Please enter a valid email address.
                        </Form.Control.Feedback> */}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="username">
                    <Form.Label as={Col} md="2">Username</Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            required
                            onChange={e => this.setState({ username: e.target.value })}
                        />
                    </Col>
                </Form.Group>
            
                <Form.Group as={Row} className="mb-3" controlId="password">
                    <Form.Label as={Col} md="2">
                    Password
                    </Form.Label>
                    <Col>
                        <Form.Control type="password" placeholder="Password" required onChange={e => this.setState({ password: e.target.value })}/>
                    </Col>

                    {/* <Form.Control.Feedback type="invalid">
                        Please enter a valid password.
                    </Form.Control.Feedback> */}
                </Form.Group>
                {/* <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="password">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="State" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid state.
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="text" placeholder="Zip" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid zip.
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row> */}
        
            <Form.Group as={Row} className="mb-3" controlId="gender">
                <Form.Label as={Col} md="2">Gender</Form.Label>
                <Col>
                    <Form.Control as="select" onChange={e => this.setState({ gender: e.target.value })} required>
                        <option value="" disabled selected>Select your gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </Form.Control>
                </Col>
                {/* <Form.Control.Feedback type="invalid">
                    Please select a valid gender
                </Form.Control.Feedback> */}
            </Form.Group>
                
            <Form.Group as={Row} className="mb-3" controlId="age">
                <Form.Label as={Col} md="2">Age</Form.Label>
                <Col>
                    <Form.Control type="number" placeholder="Age" min="0" onChange={e => this.setState({ age: e.target.value })} required />
                </Col>
                
                {/* <Form.Control.Feedback type="invalid">
                    Please provide age.
                </Form.Control.Feedback> */}
            </Form.Group>
                
            <Form.Group controlId="profilePicture" as={Row} className="mb-3">
                <Form.Label as={Col} md="2">Upload Profile Image (optional)</Form.Label>
                <Col>
                    <Form.Control type="file" onChange={this.fileUploadInputChange}/>
                </Col>
            </Form.Group>
                
            {/* <h2 align="left" >Connection Demographic Survey</h2>
            <p align="left">Please give us a little insight on your friend network's age demographic.</p>
            <Form.Group controlId="connectionDemographic" as={Row} classNAme="mb-3">
                <Form.Label>
                    Age 0 - 18
                </Form.Label>
                <Col>
                    <Form.Control type="number" placeholder="Age" min="0" max="100" onChange={this.handleDemographic} required />
                </Col>
                <Form.Label>
                    Age 18 - 28
                </Form.Label>
                <Col>
                    <Form.Control type="number" placeholder="Age" min="0" max="100" onChange={this.handleDemographic} required />
                </Col>
                <Form.Label>
                    Age 28 - 38
                </Form.Label>
                <Col>
                    <Form.Control type="number" placeholder="Age" min="0" max="100" onChange={this.handleDemographic} required />
                </Col>
            </Form.Group> */}

            <Form.Group as={Row} className="mb-3">
                <Form.Check
                    required
                    label="Agree to terms and conditions"
                    id="1"
                    // feedback="You must agree before submitting."
                    // feedbackType="invalid"
                />
            </Form.Group>
            <Button type="submit" variant="secondary">Register</Button>
        </Form>
    </Container>)
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

const connectedSignUpPage = connect(mapStateToProps)(SignUpPage);
export { connectedSignUpPage as SignUpPage }; 