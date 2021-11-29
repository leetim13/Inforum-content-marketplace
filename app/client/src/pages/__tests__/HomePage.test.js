import {HomePage} from '../HomePage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const store = mockStore({});
configure({ adapter: new Adapter() });


describe("Test HomePage", () => {
    it("should render without crashing", () => {

        const wrapper = shallow(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );
        // console.log(wrapper.debug());
        // expect(wrapper.text().includes('Create a Campaign')).toBe(true);
    });
});

