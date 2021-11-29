import {LandingPage, LandingPagePlain} from '../LandingPage.jsx';
import React from "react";
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import { connect, Provider } from 'react-redux';
import { asyncFunctionMiddleware } from '../../_helpers/async-middleware';
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
// const mockStore = configureMockStore();
const store = mockStore({
    authentication: {user123: {}},
    campaigns: [],

});
configure({ adapter: new Adapter() });




describe("Test LandingPage", () => {
    it("should render LandingPage", () => {

        // expect(
        //     shallow(
        //         <Provider store={store}>
        //             <LandingPage />
        //         </Provider>
        //     ).exists(>)
        // ).toBe(true);

        const wrapper = shallow(
            // <Provider store={store}>
                <LandingPage store={store}/>
            // </Provider>
        ).dive().dive();
        // console.log(wrapper.debug());
        // expect(wrapper.exists(<h1><i>Browse. Share. Earn Rewards.</i></h1>)).toBe(true);
        // wrapper.find(LandingPage).dive()
        expect(wrapper.text().includes('Browse. Share. Earn Rewards.')).toBe(true);
    });
});

