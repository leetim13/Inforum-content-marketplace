import { Http } from '../_helpers';
import { history } from '../_helpers';

export const bankService = {
    getAll
};

async function getAll() {
    return await Http.get(`/banks`)
    .then(res => {
        localStorage.setItem('banks', JSON.stringify(res.data));
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