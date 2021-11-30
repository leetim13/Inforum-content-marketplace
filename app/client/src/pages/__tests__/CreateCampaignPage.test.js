import {CreateCampaignPage} from '../CreateCampaignPage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({
    authentication: {user: {}},
    campaigns: []
});
configure({ adapter: new Adapter() });


describe("Test CreateCampaignPage", () => {
    it("should render text CreateCampaignPage", () => {

        const wrapper = shallow(
            <CreateCampaignPage store={store}/>
        ).dive().dive();
        // console.log(wrapper.debug());
        expect(wrapper.text().includes('Create a Campaign')).toBe(true);
    });
});

