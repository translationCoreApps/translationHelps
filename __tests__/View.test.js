/* eslint-env jest */
import React from 'react';
import View from '../src/components/View';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const props = {
  translate:k=>k,
  currentFile: '# current file #\n\nHere is the current file content',
  modalFile: '# modal file #\n\nHere is the modal file content',
  modalVisibility: true,
  showModal: jest.fn(),
  hideModal: jest.fn()
};

describe('View component Tests', () => {
  it('Check View component', () => {
    const wrapper = shallow(<View {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Test View.componentWillReceiveProps', () => {
    const wrapper = shallow(<View {...props} />);
    document.getElementById('test');
    expect(wrapper.instance().props.currentFile).toEqual(props.currentFile);
    const newCurrentFile = '# new current file #\n\nnew current file contents';
    const nextProps = {
      ...props,
      currentFile: newCurrentFile
    };
    wrapper.setProps(nextProps);
    expect(wrapper.instance().props.currentFile).toEqual(newCurrentFile);
  });
});
