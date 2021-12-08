import { Http } from '../_helpers';
import { handleError } from './errorHandler';

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