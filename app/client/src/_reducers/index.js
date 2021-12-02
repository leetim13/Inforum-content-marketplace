import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { banks } from './bank.reducer';
import { campaigns } from './campaign.reducer';
import { posts } from './post.reducer';
import { users } from './user.reducer';
import { alert } from './alert.reducer';
import { userConstants } from '../_constants';

const appReducer = combineReducers({
  authentication,
  users,
  campaigns,
  banks,
  posts,
  alert
});

const rootReducer = (state, action) => {
	// when a logout action is dispatched it will reset redux state
	if (action.type === userConstants.LOGOUT) {
	  	state = undefined;
	}
  
	return appReducer(state, action);
};
export default rootReducer;