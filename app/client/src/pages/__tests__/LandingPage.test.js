import {LandingPagePlain} from '../LandingPage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});
configure({ adapter: new Adapter() });


describe("Test LandingPage", () => {
    it("should render with the text Browse. Share. Earn Rewards.", () => {

        const wrapper = shallow(
            <LandingPagePlain />
        );
        // console.log(wrapper.debug());
        expect(wrapper.text().includes('Browse. Share. Earn Rewards.')).toBe(true);
    });
});

