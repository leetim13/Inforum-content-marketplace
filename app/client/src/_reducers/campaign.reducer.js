import { campaignConstants } from '../_constants';

let c = JSON.parse(localStorage.getItem('campaigns'));
const initialState = Array.isArray(c) ? c : [];

export function campaigns(state = initialState, action) {
    switch (action.type) {
        case campaignConstants.GETALL_REQUEST:
            return [];
        case campaignConstants.GETALL_SUCCESS:
            return action.campaigns;
        case campaignConstants.GETALL_FAILURE:
            return state;
        case campaignConstants.UPDATE_CAMPAIGNS:
            return action.campaigns;
        default:
            return state
    }
}