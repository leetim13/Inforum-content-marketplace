import {CreateCampaignPage} from '../CreateCampaignPage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const store = mockStore({});
configure({ adapter: new Adapter() });


describe("Test CreateCampaignPage", () => {
    it("should render CreateCampaignPage", () => {

        const wrapper = shallow(
            <Provider store={store}>
                <CreateCampaignPage />
            </Provider>
        );
        // console.log(wrapper.debug());
        // expect(wrapper.text().includes('Create a Campaign')).toBe(true);
    });
});

