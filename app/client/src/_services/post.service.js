import { Http } from '../_helpers';
import { history } from '../_helpers';

export const postService = {
    getAll
};

function logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('user');
    localStorage.clear();
}

async function getAll(userId) {
    return await Http.get(`/users/${userId}/posts`)
    .then(res => {
        localStorage.setItem('posts', JSON.stringify(res.data));
        return res.data;
    })
    .catch(handleError);
}

function handleError(err) {
    console.log(err);
    if (err.response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        history.go(0);
    }
    return Promise.reject(err.response.data.message)
}