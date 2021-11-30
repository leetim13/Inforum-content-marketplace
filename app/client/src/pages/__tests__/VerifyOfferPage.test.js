import {VerifyOfferPage} from '../VerifyOfferPage.jsx';
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
configure({ adapter: new Adapter() });

describe("Test Unauthorized Page", () => {
    it("should render with the text Congratulations, your post has been verified!", () => {

        const wrapper = shallow(
            <VerifyOfferPage store={store} />
        ).dive().dive();
        // console.log(wrapper.debug());
        expect(wrapper.text().includes('Congratulations, your post has been verified!')).toBe(true);
    });
});

