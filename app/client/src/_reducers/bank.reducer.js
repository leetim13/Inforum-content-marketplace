import { bankConstants } from '../_constants';

export function banks(state = [], action) {
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