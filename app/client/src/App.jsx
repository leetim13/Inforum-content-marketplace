import React from "react";
import { Router, Route } from 'react-router-dom';
import { Table, Button, Alert, Row, Col } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import * as Sentry from '@sentry/react';

import { connect } from 'react-redux';

import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './_components';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';

const server_url = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001/api';

function FallbackComponent() {
    return (
      <div>An error has occured</div>
    )
  }
  
// function App() {
    
//     const [data, setData] = React.useState(null);
//     const [users, setUsers] = React.useState([]);
//     const [userName, setUserName] = React.useState("");
//     const [userRole, setUserRole] = React.useState("User");
//     const [userAge, setUserAge] = React.useState(18);
//     const [responseMessage, setResponse] = React.useState({ type: "", message: ""});
//     const [un, setUn] = React.useState("")
//     const [pass, setPass] = React.useState("")

//     React.useEffect(() => {
//         axios.get(`${server_url}`)
//             .then((res) => setData(res.data.message))
//             .catch((err) => console.log(err));
//     }, []);

//     React.useEffect(() => {
//         axios.get(`${server_url}/users`)
//             .then((res) => setUsers(res.data))
//             .catch((err) => console.log(err));
//     }, []);

//     function deleteUser(id) {
//         axios.delete(`${server_url}/users/${id}`)
//             .then(_ => 
//                 {   
//                     setResponse({type: "success", message: "Successful deleted user."})
//                     setUsers(users.filter((user, _) => user.id !== id))
//                 })
//                 .catch(err => setResponse({type: "danger", message: err.response.data.message}));
//     };

//     function addUser() {
//         // No type checking right now.
//         axios.post(`${server_url}/users`, { name: userName, role: userRole, age: parseInt(userAge) })
//             .then(res => { 
//                 setResponse({type: "success", message: "Successful added user."})
//                 setUsers([...users, res.data]); 
//             })
//             .catch(err => setResponse({type: "danger", message: err.response.data.message}));
//     };

//     function logIn() {
//         // No type checking right now.
//         axios.post(`${server_url}/users/authenticate`, { name: userName, role: userRole, age: parseInt(userAge) })
//             .then(res => { 
//                 setResponse({type: "success", message: "Successful added user."})
//                 setUsers([...users, res.data]); 
//             })
//             .catch(err => setResponse({type: "danger", message: err.response.data.message}));
//     };

//     function logOut() {
        
//     };

//     const userRows = users.map(user =>
//         <tr key={`user table ${user.id}`}>
//             <td>{user.id}</td>
//             <td>{user.name}</td>
//             <td>{user.role}</td>
//             <td>{user.age}</td>
//             <td>
//                 <Button variant="outline-danger" onClick={() => deleteUser(user.id)}>X</Button>
//             </td>
//         </tr>
//     );

//     return (
//         <div className="App">
//             <header className="App-header">
//                 <Row>
//                     <Col md="4">
//                         <img src={logo} className="App-logo" alt="logo" />
//                         <p>{!data ? "Server disconnected test..." : data}</p>
//                         <Row>
//                             <Col md="6">
//                                 <input type="text" name="un" onChange={ e => setUn(e.target.value) } />
//                                 <input type="text" name="pass" onChange={ e => setPass(e.target.value) } />
//                             </Col>
//                             <Col md="6">
//                                 <Button variant="outline-primary" onClick={() => logIn()}>Log In</Button>
//                                 <Button variant="outline-danger" onClick={() => logOut()}>Log Out</Button>
//                             </Col>
//                         </Row>
//                     </Col>
//                     <Col md="1"> </Col>
//                     <Col md="7">
//                         <Alert show={responseMessage.type !== ""} variant={responseMessage.type} transition={false}>
//                             {responseMessage.message}
//                         </Alert>
//                         <Table striped bordered hover>
//                             <thead>
//                                 <tr>
//                                     <th>Id</th>
//                                     <th>Name</th>
//                                     <th>Account Type</th>
//                                     <th>Age</th>
//                                     <th>Function</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {userRows}
//                                 <tr>
//                                     <td>#</td>
//                                     <td><input type="text" name="name" onChange={ e => setUserName(e.target.value) } /></td>
//                                     <td>
//                                         <select defaultValue="promoter" onChange={e => setUserRole(e.target.value)}>
//                                             <option value="Admin">Admin</option>
//                                             <option value="Bank">Bank</option>
//                                             <option value="User">User</option>
//                                         </select>
//                                     </td>
//                                     <td><input type="number" defaultValue="18" name="age" min="0" max="150" onChange={e => setUserAge(e.target.value)}/></td>
//                                     <td>
//                                         <Button variant="outline-secondary" onClick={() => addUser()}>Add User</Button>
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         </Table>
//                     </Col>
//                 </Row>
//             </header>

//         </div>
//     );
// }

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
                <div className="jumbotron">
                    <div className="container">
                        <div className="col-sm-8 col-sm-offset-2">
                            {alert.message &&
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            }
                            <Router history={history}>
                                <div>
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <Route path="/login" component={LoginPage} />
                                </div>
                            </Router>
                        </div>
                    </div>
                </div>
            </Sentry.ErrorBoundary>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = Sentry.withProfiler(connect(mapStateToProps)(App));

// export default App;
export { connectedApp as App };
