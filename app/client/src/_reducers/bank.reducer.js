import { bankConstants } from '../_constants';

let b = JSON.parse(localStorage.getItem('banks'));
const initialState = Array.isArray(b) ? b : [];

export function banks(state = initialState, action) {
    switch (action.type) {
        case bankConstants.GETALL_REQUEST:
            return [];
        case bankConstants.GETALL_SUCCESS:
            return action.banks;
        case bankConstants.GETALL_FAILURE:
            return state;
        case bankConstants.UPDATE_BANKS:
            return action.banks;
        default:
            return state
    }
}