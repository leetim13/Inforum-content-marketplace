import {ShareOfferPagePlain} from '../ShareOfferPage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});
configure({ adapter: new Adapter() });


describe("Test ShareOfferPage", () => {
    it("should render with the text Once we have verified your post", () => {

        const wrapper = shallow(
            <ShareOfferPagePlain />
        );
        // console.log(wrapper.debug());
        expect(wrapper.text().includes('Once we have verified your post')).toBe(true);
    });
});

