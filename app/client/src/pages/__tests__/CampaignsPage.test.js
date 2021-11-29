import {CampaignsPagePlain} from '../MyCampaignsPage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});
configure({ adapter: new Adapter() });


describe("Test CampaignsPage", () => {
    it("should render with the text Welcome to My Campaigns", () => {

        const wrapper = shallow(
            <CampaignsPagePlain />
        );
        // console.log(wrapper.debug());
        expect(wrapper.text().includes('Welcome to My Campaigns')).toBe(true);
    });
});

