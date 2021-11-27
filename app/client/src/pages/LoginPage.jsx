import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Image, Container, Modal, InputGroup} from 'react-bootstrap';

import { connect } from 'react-redux';
import { userActions } from '../_actions';

function SignUpModal() {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
        <p onClick={handleShow}>
            <b><u>Sign Up</u></b>
        </p>
    
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Create an account</Modal.Title>
            </Modal.Header>
            {/* <Modal.Body>Anyone can sign up on Inforum - you don't have to be an influencer!   </Modal.Body> */}
            <Modal.Footer>
                <SignUpForm />
            </Modal.Footer>
        </Modal>
        </>
    );
}

function SignUpForm() {
    const [validated, setValidated] = useState(false);
  
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };
  
    return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              defaultValue="Mark"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              defaultValue="Otto"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
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
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Gender</Form.Label>
            <Form.Control as="select" required>
                <option value="1">Select your Gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Other</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select a valid gender
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>Age</Form.Label>
            <Form.Control type="text" placeholder="Age" required />
            <Form.Control.Feedback type="invalid">
              Please provide age.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        
        <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>Upload Profile Image (optional)</Form.Label>
            <br></br>
            <Form.Control type="file" size="sm" />
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
            Email
            </Form.Label>
            <Col sm={10}>
            <Form.Control type="email" placeholder="Email" required/>
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
            Password
            </Form.Label>
            <Col sm={10}>
            <Form.Control type="password" placeholder="Password" required/>
            <Form.Control.Feedback type="invalid">
              Please enter a valid password.
            </Form.Control.Feedback>
            </Col>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit" variant="secondary">Register</Button>
      </Form>
    );
  }
  

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }


    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <Container className="page">
                <h1><i>Browse. Share. Earn Rewards.</i></h1>
                <h4><i>yes, it’s that simple :)</i></h4>
                <Col  md={{span: 6, offset: 3}}>
                    <div align="left"> 
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className={submitted && !username ? ' has-error' : ''} className="mb-3" controlId="formBasicEmail">
                            <Form.Label htmlFor="username">Username</Form.Label>
                            <Form.Control type="text" name="username" value={username} 
                                onChange={this.handleChange} placeholder="Enter your username" />
                            {submitted && !username &&
                                <div className="help-block">Username is required</div>
                            }
                        </Form.Group>
                        <Form.Group className={submitted && !password ? ' has-error' : ''} className="mb-3" controlId="formBasicPassword">
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control type="password" name="password" value={password}
                                onChange={this.handleChange} placeholder="Enter your password" />
                            {submitted && !password &&
                                <div className="help-block">Password is required</div>
                            }
                        </Form.Group>

                        <Button variant="secondary" type="submit" >Login</Button>
                        {loggingIn &&
                            <Image src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        
                        <div align="right">
                            <i>Don't have an account yet?</i>
                            <SignUpModal />
                        </div>
                        
                    </Form>
                    </div>
                </Col>
                
            </Container>
            
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 