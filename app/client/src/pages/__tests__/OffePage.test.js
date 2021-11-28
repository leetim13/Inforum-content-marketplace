import {OfferPage} from '../OfferPage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const store = mockStore({});
configure({ adapter: new Adapter() });

describe("Test OfferPage", () => {
    it("should render OfferPage", () => {

        const wrapper = shallow(
            <Provider store={store}>
                <OfferPage />
            </Provider>
        );
        // console.log(wrapper.debug());
        // expect(wrapper.text().includes('Share this offer!')).toBe(true);
    });
});

