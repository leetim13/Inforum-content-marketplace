import axios from 'axios';
const server_url = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001/api';
const user = JSON.parse(localStorage.getItem('user'));

const Http = axios.create({
    baseURL: server_url
});
axios.defaults.headers.common['Content-Type'] = 'application/json';

if (user && user.token) {
    axios.defaults.headers.common['Authorization'] = "Bearer " + user.token;
} 

export { Http };