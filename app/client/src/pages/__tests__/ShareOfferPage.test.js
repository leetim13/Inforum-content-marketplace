import {ShareOfferPage} from '../ShareOfferPage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({
    authentication: {user: {}},
    campaigns: [{id: 1}, {id: 1}],
});
const match = { params : { baseId : 1 } }

configure({ adapter: new Adapter() });



describe("Test ShareOfferPage", () => {
    it("should render ShareOfferPage", () => {

        const wrapper = shallow(
            <ShareOfferPage store={store} match={match}/>
        ).dive().dive();
        // console.log(wrapper.debug());
        expect(wrapper.text().includes('Once we have verified your post')).toBe(true);
    });
});

