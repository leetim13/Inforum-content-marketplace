import React from 'react';
import { render, screen } from '@testing-library/react';
import {App} from './App';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
it("test App renders without crashing", () => {
  shallow(<App />);
});
