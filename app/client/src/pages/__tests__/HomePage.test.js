import {HomePage} from '../HomePage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({
    authentication: {user: {}},
    campaigns: [],
    users: []
});
configure({ adapter: new Adapter() });

describe("Test HomePage", () => {
    it("HomePage should render without crashing", () => {

        const wrapper = shallow(
            <HomePage store={store} />
        );
        // console.log(wrapper.debug());
        // expect(wrapper.text().includes('Create a Campaign')).toBe(true);
    });
});

