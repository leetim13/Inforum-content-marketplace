import { bankService, campaignService, postService, userService} from '..';
const dispatch = jest.fn();

test('bankService', () => {
  const getAllProps = bankService.getAll(dispatch);
  expect(getAllProps).toEqual(expect.any(Promise))
})

test('campaignService', () => {
  const getAllProps = campaignService.getAll(dispatch);
  expect(getAllProps).toEqual(expect.any(Promise))

  const getCampaignImageProps = campaignService.getCampaignImage(dispatch);
  expect(getCampaignImageProps).toEqual(expect.any(Promise))

  const getAllByBankProps = campaignService.getAllByBank(dispatch);
  expect(getAllByBankProps).toEqual(expect.any(Promise))
})

test('postService', () => {
  const getAllProps = postService.getAll(dispatch);
  expect(getAllProps).toEqual(expect.any(Promise))
})

test('userService', () => {
  const getAllProps = userService.getAll(dispatch);
  expect(getAllProps).toEqual(expect.any(Promise))

  const loginProps = userService.login(dispatch);
  expect(loginProps).toEqual(expect.any(Promise))

  const logoutProps = userService.logout(dispatch);
  expect(logoutProps).toEqual()
})