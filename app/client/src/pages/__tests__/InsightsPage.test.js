import {InsightsPagePlain} from '../InsightsPage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});
configure({ adapter: new Adapter() });


describe("Test InsightsPage", () => {
    it("should render with the text Total Clicks by Age Group", () => {

        const wrapper = shallow(
            <InsightsPagePlain />
        );
        // console.log(wrapper.debug());
        expect(wrapper.text().includes('Total Clicks by Age Group')).toBe(true);
    });
});

