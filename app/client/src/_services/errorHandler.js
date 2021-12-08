import { history } from '../_helpers';

export const handleError = (err) => {
    if (err.response.status === 401) {
        // auto logout if 401 response returned from api
        history.push("/unauthorized");
    }
    return Promise.reject(err.response.data.message)
}