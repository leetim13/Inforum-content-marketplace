import { campaignConstants } from '../_constants';
import { campaignService } from '../_services';
import { alertActions } from '.';

export const campaignActions = {
    getAll,
    updateCampaigns
};

function getAll() {
    return dispatch => {
        dispatch(request());
        campaignService.getAll()
            .then(
                campaigns => dispatch(success(campaigns)),
                error => { 
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() { return { type: campaignConstants.GETALL_REQUEST } }
    function success(campaigns) { return { type: campaignConstants.GETALL_SUCCESS, campaigns } }
    function failure(error) { return { type: campaignConstants.GETALL_FAILURE, error } }
}

function updateCampaigns(campaigns) {
    return dispatch => {
        dispatch(update(campaigns));
    };

    function update(campaigns) { return { type: campaignConstants.UPDATE_CAMPAIGNS, campaigns } }
}