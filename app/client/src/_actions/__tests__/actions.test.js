import { alertActions, campaignActions, postActions} from '..';

// test("test postActions", () => {
//     expect(postActions.updatePosts()).toEqual(expect.any(Function))
// });

const dispatch = jest.fn();

test('postActions', () => {
  const props = postActions.getAll(dispatch);
  expect(props).toEqual(expect.any(Function))
})

