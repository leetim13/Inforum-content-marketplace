import { postConstants } from '../_constants';
import { postService } from '../_services';
import { alertActions } from '.';

export const postActions = {
    getAll,
    updatePosts
};

function getAll() {
    return dispatch => {
        dispatch(request());
        postService.getAll()
            .then(
                posts => dispatch(success(posts)),
                error => { 
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() { return { type: postConstants.GETALL_REQUEST } }
    function success(posts) { return { type: postConstants.GETALL_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.GETALL_FAILURE, error } }
}

function updatePosts(posts) {
    return dispatch => {
        dispatch(update(posts));
    };

    function update(posts) { return { type: postConstants.UPDATE_POSTS, posts } }
}