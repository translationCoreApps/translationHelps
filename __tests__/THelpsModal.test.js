/* eslint-env jest */
import React from 'react';
import THelpsModal from '../src/components/THelpsModal';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const props = {
  translate:k=>k,
  onHide: jest.fn(),
  children: "[children]",
  show: true
};

describe('THelpsModal component Tests', () => {
  it('Check THelpsModal component', () => {
    const wrapper = shallow(<THelpsModal {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});