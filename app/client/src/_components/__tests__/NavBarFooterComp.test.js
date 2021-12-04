import NavBarFooterComp from '../NavBarFooterComp.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk'
import {render, fireEvent, cleanup} from '@testing-library/react';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({
    authentication: {user: {}},
    campaigns: []
});
configure({ adapter: new Adapter() });


describe("Test NavBarFooterComp", () => {
    it("should render text Powered by React.", () => {

        const wrapper = shallow(
            <NavBarFooterComp/>
        ).dive();
        // console.log(wrapper.debug());
        expect(wrapper.text().includes('Powered by React.')).toBe(true);
    });
});

