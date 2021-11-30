import {LandingPage} from '../LandingPage.jsx';
import React from "react";
import { configure, shallow, mount } from 'enzyme';
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




describe("Test LandingPage", () => {
    it("should render LandingPage with text Browse. Share. Earn Rewards.", () => {
        const wrapper = shallow(
                <LandingPage store={store}/>
        ).dive().dive();
        expect(wrapper.text().includes('Browse. Share. Earn Rewards.')).toBe(true);
    });
});

