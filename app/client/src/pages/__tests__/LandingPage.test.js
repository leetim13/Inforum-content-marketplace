import {LandingPage} from '../LandingPage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const store = mockStore({});
configure({ adapter: new Adapter() });


describe("Test LandingPage", () => {
    it("should render LandingPage", () => {

        const wrapper = shallow(
            <Provider store={store}>
                <LandingPage />
            </Provider>
        );
        // console.log(wrapper.debug());
        // expect(wrapper.text().includes('Browse. Share. Earn Rewards.')).toBe(true);
    });
});

