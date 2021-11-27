import { postConstants } from '../_constants';

let p = JSON.parse(localStorage.getItem('posts'));
const initialState = Array.isArray(p) ? p : [];

export function posts(state = initialState, action) {
    switch (action.type) {
        case postConstants.GETALL_REQUEST:
            return [];
        case postConstants.GETALL_SUCCESS:
            return action.posts;
        case postConstants.GETALL_FAILURE:
            return state;
        case postConstants.UPDATE_POSTS:
            return action.posts;
        default:
            return state
    }
}