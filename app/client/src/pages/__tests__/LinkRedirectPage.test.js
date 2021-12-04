import {LinkRedirectPage} from '../LinkRedirectPage.jsx';
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

describe("Test LinkRedirectPage Page", () => {
    it("should render with the text This is Inforum's redirect page.", () => {

        const wrapper = shallow(
            <LinkRedirectPage store={store} match={match}/>
        ).dive().dive();
        // console.log(wrapper.debug());
        expect(wrapper.text().includes("This is Inforum's redirect page.")).toBe(true);
    });
});

