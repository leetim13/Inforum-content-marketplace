import React from "react";
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
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
        this.handleChange = this.handleChange.bind(this);
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
		
		fileParser(e, (e) => this.setState({ profilePicture: btoa(e.target.result) }));
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
   
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

	render() {
        const { username, password, profilePicture, firstName, lastName, age, gender, role, email} = this.state;

        const formData = [
            {
                name: "firstName",
                text: "First name",
                html_type: "text"
            },
            {
                name: "lastName",
                text: "Last name",
                html_type: "text"
            },
            {
                name: "email",
                text: "Email",
                html_type: "email"
            },
            {
                name: "username",
                text: "Username",
                html_type: "text"
            },
            {
                name: "password",
                text: "Password",
                html_type: "password"
            },
        ]

		return (
        <Container className="page">
            <h1 align="left" style={{padding: '10px'}} >Sign Up</h1>
            <Form onSubmit={this.handleSubmit}>

               {formData.map((formType) => (
                    <Form.Group key={formType} as={Row} className="mb-3" controlId={formType.name} >
                        <Form.Label as={Col} md="2">{formType.text}</Form.Label>
                        <Col>
                        <Form.Control
                            required
                            name={formType.name} 
                            type={formType.html_type}
                            placeholder={formType.text}
                            onChange={this.handleChange}
                        />
                        </Col>
                    </Form.Group>
                ))}

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
            </Form.Group>
                
            <Form.Group as={Row} className="mb-3" controlId="age">
                <Form.Label as={Col} md="2">Age</Form.Label>
                <Col>
                    <Form.Control type="number" placeholder="Age" min="0" onChange={e => this.setState({ age: e.target.value })} required />
                </Col>
            </Form.Group>
                
            <Form.Group controlId="profilePicture" as={Row} className="mb-3">
                <Form.Label as={Col} md="2">Upload Profile Image (optional)</Form.Label>
                <Col>
                    <Form.Control type="file" onChange={this.fileUploadInputChange}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" align="left">
                <Form.Check
                    required
                    label="I agree to the terms and conditions."
                    id="1"
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