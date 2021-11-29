import {ShareOfferPage} from '../ShareOfferPage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const store = mockStore({});
configure({ adapter: new Adapter() });



describe("Test ShareOfferPage", () => {
    it("should render ShareOfferPage", () => {

        const wrapper = shallow(
            <Provider store={store}>
                <ShareOfferPage />
            </Provider>
        );
        // console.log(wrapper.debug());
        // expect(wrapper.text().includes('Once we have verified your post')).toBe(true);
    });
});

