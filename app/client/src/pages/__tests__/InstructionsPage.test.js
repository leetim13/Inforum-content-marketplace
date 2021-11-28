import {InstructionsPagePlain} from '../InstructionsPage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});
configure({ adapter: new Adapter() });


describe("Test InstructionsPagePlain", () => {
    it("should render with the text Everyone can sign up - you DON’T have to be an influencer!", () => {

        const wrapper = shallow(
            <InstructionsPagePlain />
        );
        // console.log(wrapper.debug());
        expect(wrapper.text().includes('Everyone can sign up - you DON’T have to be an influencer!')).toBe(true);
    });
});

