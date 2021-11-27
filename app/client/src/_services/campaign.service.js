import axios from 'axios';
import { authHeader } from '../_helpers';
import { history } from '../_helpers';

const server_url = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001/api';

axios.defaults.headers.common['Content-Type'] = 'application/json';
export const campaignService = {
    getAll
};

function logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('user');
    localStorage.clear();
}

async function getAll() {
    axios.defaults.headers.common['Authorization'] = "Bearer " + authHeader();
    return await axios.get(`${server_url}/campaigns`)
    .then(res => {
        localStorage.setItem('campaigns', JSON.stringify(res.data));
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