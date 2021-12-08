import { Http } from '../_helpers';
import { handleError } from './errorHandler';

export const userService = {
    login,
    logout
};

async function login(username, password) {
    return await Http.post(`/users/authenticate`, { 
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

