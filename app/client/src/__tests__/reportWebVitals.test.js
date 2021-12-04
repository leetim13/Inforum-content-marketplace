import {reportWebVitals} from '../reportWebVitals';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk'


configure({ adapter: new Adapter() });


describe("Test reportWebVitals", () => {
    it("should render without crashing", () => {

        const wrapper = shallow(
            <reportWebVitals />
        );
        // console.log(wrapper.debug());
        // expect(wrapper.text().includes('Create a Campaign')).toBe(true);
    });
});