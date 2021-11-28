import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { banks } from './bank.reducer';
import { campaigns } from './campaign.reducer';
import { posts } from './post.reducer';
import { users } from './user.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  campaigns,
  banks,
  posts,
  alert
});

export default rootReducer;