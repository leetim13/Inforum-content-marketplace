import React from "react";
import { Table, Button, Alert, Row, Col } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
    const [data, setData] = React.useState(null);
    const [users, setUsers] = React.useState([]);
    const [userName, setUserName] = React.useState("");
    const [userType, setUserType] = React.useState("promoter");
    const [userAge, setUserAge] = React.useState(18);
    const [responseMessage, setResponse] = React.useState({ type: "", message: ""});

    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    React.useEffect(() => {
        fetch("/api/users")
            .then((res) => res.json())
            .then((users) => setUsers(users));
    }, []);

    function deleteUser(id) {
        axios.delete(`/api/users/${id}`)
            .then(_ => 
                {   
                    setResponse({type: "success", message: "Successful deleted user."})
                    setUsers(users.filter((user, _) => user.id !== id))
                })
                .catch(err => setResponse({type: "danger", message: err.response.data.message}));
    };

    function addUser() {
        // No type checking right now.
        axios.post(`/api/users`, { name: userName, type: userType, age: parseInt(userAge) })
            .then(res => { 
                setResponse({type: "success", message: "Successful added user."})
                setUsers([...users, res.data]); 
            })
            .catch(err => setResponse({type: "danger", message: err.response.data.message}));
    };

    const userRows = users.map(user =>
        <tr key={`user table ${user.id}`}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.type}</td>
            <td>{user.age}</td>
            <td>
                <Button variant="outline-secondary" onClick={() => deleteUser(user.id)}>X</Button>
            </td>
        </tr>
    );

    return (
        <div className="App">
            <header className="App-header">
                <Row>
                    <Col md="4">
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>{!data ? "Server disconnected..." : data}</p>
                    </Col>
                    <Col md="1"> </Col>
                    <Col md="7">
                        <Alert show={responseMessage.type !== ""} variant={responseMessage.type} transition={false}>
                            {responseMessage.message}
                        </Alert>
                        <Table striped bordered hover style={{ width: "50vw" }}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Account Type</th>
                                    <th>Age</th>
                                    <th>Delete User</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userRows}
                                <tr>
                                    <td>#</td>
                                    <td><input type="text" name="name" onChange={ e => setUserName(e.target.value) } /></td>
                                    <td>
                                        <select defaultValue="promoter" onChange={e => setUserType(e.target.value)}>
                                            <option value="admin">Admin</option>
                                            <option value="bank">Bank</option>
                                            <option value="promoter">Promoter</option>
                                        </select>
                                    </td>
                                    <td><input type="number" defaultValue="18" name="age" min="0" max="150" onChange={e => setUserAge(e.target.value)}/></td>
                                    <td>
                                        <Button variant="outline-secondary" onClick={() => addUser()}>Add User</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </header>

        </div>
    );
}

export default App;
