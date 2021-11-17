import { campaignConstants } from '../_constants';

export function users(state = [], action) {
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