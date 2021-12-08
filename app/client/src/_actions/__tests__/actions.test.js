import { alertActions, campaignActions, postActions, userActions } from '..';
const dispatch = jest.fn();

test('alertActions', () => {
  const successProps = alertActions.success(dispatch);
  expect(successProps).toEqual({"message": expect.any(Function), "type": "ALERT_SUCCESS"})

  const errorProps = alertActions.error(dispatch);
  expect(errorProps).toEqual({"message": expect.any(Function), "type": "ALERT_ERROR"})

  const clearProps = alertActions.clear(dispatch);
  expect(clearProps).toEqual({"type": "ALERT_CLEAR"})
})

test('campaignActions', () => {
  const getAllProps = campaignActions.getAll(dispatch);
  expect(getAllProps).toEqual(expect.any(Function))

  const updateCampaignsProps = campaignActions.updateCampaigns(dispatch);
  expect(updateCampaignsProps).toEqual(expect.any(Function))

  const getAllByBankProps = campaignActions.getAllByBank(dispatch);
  expect(getAllByBankProps).toEqual(expect.any(Function))

})

test('postActions', () => {
  const getAllProps = postActions.getAll(dispatch);
  expect(getAllProps).toEqual(expect.any(Function))

  const updatePostsProps = postActions.updatePosts(dispatch);
  expect(updatePostsProps).toEqual(expect.any(Function))
})

test('userActions', () => {

  const loginProps = userActions.login(dispatch);
  expect(loginProps).toEqual(expect.any(Function))

  const logoutProps = userActions.logout(dispatch);
  expect(logoutProps).toEqual({"type": "USERS_LOGOUT"})
})


