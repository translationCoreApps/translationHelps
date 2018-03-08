/* eslint-env jest */
import React from 'react';
import View from '../src/components/View';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import renderer from 'react-test-renderer';

jest.mock('../src/components/THelpsModal.js', () => '[THelpsModal]');

describe('View component Tests', () => {
  it('Check View component', () => {
    let props = {
      translate:k=>k,
      currentFile: '# current file #\n\nHere is the current file content',
      modalFile: '# modal file #\n\nHere is the modal file content',
      modalVisibility: true,
      showModal: jest.fn(),
      hideModal: jest.fn()
    };
    const component = renderer.create(
      <MuiThemeProvider>
        <View {...props} />
      </MuiThemeProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
