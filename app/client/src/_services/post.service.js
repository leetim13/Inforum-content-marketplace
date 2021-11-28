import { Http } from '../_helpers';
import { history } from '../_helpers';

const server_url = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001/api';

export const postService = {
    getAll
};

function logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('user');
    localStorage.clear();
}

async function getAll() {
    return await Http.get(`${server_url}/posts`)
    .then(res => {
        localStorage.setItem('posts', JSON.stringify(res.data));
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