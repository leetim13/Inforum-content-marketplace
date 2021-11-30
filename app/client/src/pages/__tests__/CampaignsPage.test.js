import {CampaignsPage} from '../CampaignsPage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({
    authentication: {user: {}},
    campaigns: [],
});
configure({ adapter: new Adapter() });

describe("Test CampaignsPage", () => {
    it("should render with the text Welcome to My Campaigns", () => {

        const wrapper = shallow(
            <CampaignsPage store={store}/>
        ).dive().dive();
        expect(wrapper.text().includes('Welcome to My Campaigns')).toBe(true);
        // console.log(wrapper.debug());
    });
});

