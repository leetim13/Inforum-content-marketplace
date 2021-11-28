import {CreateCampaignPagePlain} from '../CreateCampaignPage.jsx';
import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});
configure({ adapter: new Adapter() });


describe("Test CreateCampaignPage", () => {
    it("should render with the text Create a Campaign", () => {

        const wrapper = shallow(
            <CreateCampaignPagePlain />
        );
        // console.log(wrapper.debug());
        expect(wrapper.text().includes('Create a Campaign')).toBe(true);
    });
});

