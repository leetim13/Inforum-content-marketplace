import {MyPostsPage} from '../MyPostsPage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const store = mockStore({});
configure({ adapter: new Adapter() });


describe("Test MyPostsPage", () => {
    it("should render MyPostsPage", () => {

        const wrapper = shallow(
            <Provider store={store}>
                <MyPostsPage />
            </Provider>
        );
        // console.log(wrapper.debug());
        // expect(wrapper.text().includes('Welcome to My Posts')).toBe(true);
    });
});

