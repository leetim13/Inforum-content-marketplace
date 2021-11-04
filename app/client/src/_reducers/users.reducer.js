import { userConstants } from '../_constants';

export function users(state = [], action) {
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