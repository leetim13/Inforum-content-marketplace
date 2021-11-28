import {MyPostsPagePlain} from '../MyPostsPage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});
configure({ adapter: new Adapter() });


describe("Test MyPostsPage", () => {
    it("should render with the text Welcome to My Posts", () => {

        const wrapper = shallow(
            <MyPostsPagePlain />
        );
        // console.log(wrapper.debug());
        expect(wrapper.text().includes('Welcome to My Posts')).toBe(true);
    });
});

