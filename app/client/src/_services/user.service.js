import axios from 'axios';

const server_url = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001/api';

axios.defaults.headers.common['Content-Type'] = 'application/json';
export const userService = {
    login,
    logout,
    getAll
};

async function login(username, password) {
    return await axios.post(`${server_url}/users/authenticate`, { 
        username, password 
    })
    .then(res => {
        console.log(res.data)
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
    })
    .catch(handleError);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

async function getAll() {
    return await axios.get(`${server_url}/users`)
    .then(res => res.data)
    .catch(handleError);
}

function handleError(err) {
    if (err.response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
    }
    return Promise.reject(err.response.data.message)
}