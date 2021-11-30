import {MyPostsPage} from '../MyPostsPage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({
    authentication: {user: {}},
    campaigns: [],
    posts: []
});
configure({ adapter: new Adapter() });


describe("Test MyPostsPage", () => {
    it("should render Welcome to My Posts", () => {

        const wrapper = shallow(
            <MyPostsPage store={store}/>
        ).dive().dive();
        // console.log(wrapper.debug());
        expect(wrapper.text().includes('Welcome to My Posts')).toBe(true);
    });
});

