import {OfferPagePlain} from '../OfferPage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});
configure({ adapter: new Adapter() });


describe("Test OfferPage", () => {
    it("should render with the text Share this offer!", () => {

        const wrapper = shallow(
            <OfferPagePlain />
        );
        // console.log(wrapper.debug());
        expect(wrapper.text().includes('Share this offer!')).toBe(true);
    });
});

