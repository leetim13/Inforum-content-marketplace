import { Http } from '../_helpers';
import { history } from '../_helpers';

const server_url = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001/api';

export const userService = {
    login,
    logout,
    getAll
};

async function login(username, password) {
    return await Http.post(`${server_url}/users/authenticate`, { 
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
    // localStorage.removeItem('user');
    localStorage.clear();
}

async function getAll() {
    return await Http.get(`${server_url}/users`)
    .then(res => {
        localStorage.setItem('users', JSON.stringify(res.data));
        return res.data;
    })
    .catch(handleError);
}

function handleError(err) {
    if (err.response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        history.go(0);
    }
    return Promise.reject(err.response.data.message)
}