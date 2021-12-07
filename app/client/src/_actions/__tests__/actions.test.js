import { alertActions, campaignActions, postActions} from '..';

// test("test postActions", () => {
//     expect(postActions.updatePosts()).toEqual(expect.any(Function))
// });

const dispatch = jest.fn();

test('alertActions', () => {
  const props = alertActions.success(dispatch);
  expect(props).toEqual({"message": expect.any(Function), "type": "ALERT_SUCCESS"})
})

test('postActions', () => {
  const props = postActions.getAll(dispatch);
  expect(props).toEqual(expect.any(Function))
})

test('campaignActions', () => {
  const props = campaignActions.updateCampaigns(dispatch);
  expect(props).toEqual(expect.any(Function))
})
