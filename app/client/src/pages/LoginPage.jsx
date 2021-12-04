import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Image, Container, Link, InputGroup} from 'react-bootstrap';
import { Http } from '../_helpers';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

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
                            
                            <Row>
                                <Col>
                                    <Button variant="secondary" type="submit" >Login</Button>   
                                </Col>
                                <Col>
                                
                                    <div align="right">
                                        <i>Don't have an account yet?</i>
                                        <br/>
                                        <a href={`/signup`}>Sign Up</a>
                                    </div>
                                </Col>
                            </Row>
							{loggingIn &&
								<Image src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
							}
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