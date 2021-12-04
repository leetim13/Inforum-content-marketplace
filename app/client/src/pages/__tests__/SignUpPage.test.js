import {SignUpPage} from '../SignUpPage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({
    authentication: {user: {}},
    campaigns: []
});
const match = { params : { baseId : 1 } }
configure({ adapter: new Adapter() });

describe("Test SignUpPage Page", () => {
    it("should render with the text Username", () => {

        const wrapper = shallow(
            <SignUpPage store={store} match={match}/>
        ).dive().dive();
        // console.log(wrapper.debug());
        expect(wrapper.text().includes("Username")).toBe(true);
    });
});

