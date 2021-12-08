import { Http } from '../_helpers';
import { history } from '../_helpers';

export const postService = {
    getAll
};

async function getAll(userId) {
    return await Http.get(`/users/${userId}/posts`)
    .then(res => {
        localStorage.setItem('posts', JSON.stringify(res.data));
        return res.data;
    })
    .catch(handleError);
}

function handleError(err) {
    if (err.response.status === 401) {
        history.push("/unauthorized");
    }
    return Promise.reject(err.response.data.message)
}