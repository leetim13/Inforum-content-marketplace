import {App} from '../App';
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


describe("Test App", () => {
    it("should render without crashing", () => {

        const wrapper = shallow(
            <App store={store}/>
        ).dive().dive();
        // console.log(wrapper.debug());
        // expect(wrapper.text().includes('Create a Campaign')).toBe(true);
    });
});