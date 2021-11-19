import { bankConstants } from '../_constants';
import { bankService } from '../_services';
import { alertActions } from '.';

export const bankActions = {
    getAll,
    updatePosts
};

function getAll() {
    return dispatch => {
        dispatch(request());
        bankService.getAll()
            .then(
                banks => dispatch(success(banks)),
                error => { 
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() { return { type: bankConstants.GETALL_REQUEST } }
    function success(banks) { return { type: bankConstants.GETALL_SUCCESS, banks } }
    function failure(error) { return { type: bankConstants.GETALL_FAILURE, error } }
}

function updatePosts(banks) {
    return dispatch => {
        dispatch(update(banks));
    };

    function update(banks) { return { type: bankConstants.UPDATE_POSTS, banks } }
}