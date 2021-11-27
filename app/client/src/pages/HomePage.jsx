import React from 'react';
import { Table, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { connect } from 'react-redux';
// import { history } from '../_helpers';
import axios from 'axios';
import { authHeader } from '../_helpers'
import { userActions, alertActions } from '../_actions';
const server_url = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001/api';

class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : null,
            userName : "",
            userRole : "User",
            userAge : 18,
            un : "",
            pass : ""
        }        
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = "Bearer " + authHeader();
        this.props.dispatch(userActions.getAll());
        axios.get(`${server_url}`)
            .then((res) => this.setState({ data: res.data.message }))
            .catch((err) => console.log(err));
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    deleteUser = (id) => {
        axios.delete(`${server_url}/users/${id}`)
            .then(_ => 
                {   
                    this.props.dispatch(userActions.updateUsers(this.props.users.filter((user, _) => user.id !== id)))
                    this.props.dispatch(alertActions.success("Successful deleted user."))
                })
                .catch(err => this.props.dispatch(alertActions.error(err.response.data.message)))
    };

    addUser = () => {
        // No type checking right now.
        axios.post(`${server_url}/users`, { name: this.state.userName, role: this.state.userRole, age: parseInt(this.state.userAge) })
            .then(res => { 
                this.props.dispatch(userActions.updateUsers([...this.props.users, res.data]))
                this.props.dispatch(alertActions.success("Successful added user."))
            })
            .catch(err => this.props.dispatch(alertActions.error(err.response.data.message)))
    };

    render() {
        const { user, users } = this.props;
        const userRows = users.map(user =>
            <tr key={`user table ${user.id}`}>
                <td>{user.id}</td>
                <td>{user.firstName + user.lastName}</td>
                <td>{user.role}</td>
                <td>{user.age}</td>
                <td>
                    <Button variant="outline-danger" onClick={() => this.deleteUser(user.id)}>X</Button>
                </td>
            </tr>
        );
        return (
        <Row className="page">
            <Col md="4">
                <img src={logo} className="App-logo" alt="logo" />
                <p>{!this.state.data ? "Server disconnected test..." : this.state.data}</p>
                <p> {user ? `Currently logged in as ${user.role === 'Bank' ? user.name : user.firstName} with role ${user.role}` : "This should not happen, NOT AUTHENTICATED!"} </p>
                <Link to="/login" >Log out</Link>
            </Col>
            <Col md="1"> </Col>
            <Col md="7">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Account Type</th>
                            <th>Age</th>
                            <th>Function</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userRows}
                        <tr>
                            <td>#</td>
                            <td><input type="text" name="userName" onChange={this.handleChange} /></td>
                            <td>
                                <select name="userRole" defaultValue="User" onChange={e => {this.setState({ userRole: e.target.options[e.target.selectedIndex].value})}}>
                                    <option value="Admin">Admin</option>
                                    <option value="Bank">Bank</option>
                                    <option value="User">User</option>
                                </select>
                            </td>
                            <td><input type="number" defaultValue="18" name="userAge" min="0" max="150" onChange={this.handleChange}/></td>
                            <td>
                                <Button variant="outline-secondary" onClick={() => this.addUser()}>Add User</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };