import { userConstants } from '../_constants';

let u = JSON.parse(localStorage.getItem('users'));
const initialState = Array.isArray(u) ? u : [];

export function users(state = initialState, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return [];
        case userConstants.GETALL_SUCCESS:
            return action.users;
        case userConstants.GETALL_FAILURE:
            return state;
        case userConstants.UPDATE_USERS:
            return action.users;
        default:
            return state
    }
}