/* eslint-env jest */
import React from 'react';
import THelpsModal from '../src/components/THelpsModal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import renderer from 'react-test-renderer';

jest.mock('../src/components/THelpsModal.js', () => '[THelpsModal]');

describe('THelpsModal component Tests', () => {
  it('Check THelpsModal component', () => {
    let props = {
      translate:k=>k,
      onHide: jest.fn(),
      children: "[children]",
      show: true
    };
    const component = renderer.create(
      <MuiThemeProvider>
        <THelpsModal {...props} />
      </MuiThemeProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});