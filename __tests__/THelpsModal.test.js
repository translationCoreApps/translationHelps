/* eslint-env jest */
import React from 'react';
import THelpsModal from '../src/components/THelpsModal';
import { shallow } from 'enzyme';

describe('THelpsModal component Tests', () => {
  it('Check THelpsModal component', () => {
    let props = {
      translate:k=>k,
      onHide: jest.fn(),
      children: "[children]",
      show: true
    };
    const wrapper = shallow(<THelpsModal {...props} />);
    expect(wrapper.prop('children')).toMatchSnapshot();
  });
});