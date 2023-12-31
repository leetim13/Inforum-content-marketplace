import {InstructionsPage} from '../InstructionsPage.jsx';
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


describe("Test InstructionsPagePlain", () => {
    it("should render with the text Everyone can sign up - you DON’T have to be an influencer!", () => {

        const wrapper = shallow(
            <InstructionsPage store={store} />
        ).dive().dive();
        // console.log(wrapper.debug());
        expect(wrapper.text().includes('Everyone can sign up - you DON’T have to be an influencer!')).toBe(true);
    });
});

