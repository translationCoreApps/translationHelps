/* eslint-env jest */
import React from 'react';
import Container from '../src/Container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

jest.mock('../src/components/View.js', () => '[View]');

const props = {
  translate: k=>k,
  actions: {
    loadResourceArticle: (lang, type, cat, article)=>{
      return lang+', '+type+', '+cat+', '+article;
    }
  },
  currentFile: '# test #\n\nThis is a [test](rc://en/ta/man/translate/test)',
  online: true,
  projectDetailsReducer: {
    currentProjectToolsSelectedGL: {'testTool': 'en'}
  },
  resourcesReducer: {
    translationHelps: {'type':{}}
  },
  toolsReducer: {
    currentToolName: 'testTool'
  },
};

describe('Container Tests', () => {
  it('Test Container', () => {
    const component = renderer.create(
      <MuiThemeProvider>
        <Container {...props} />
      </MuiThemeProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Test Container.followLink()', () => {
    const wrapper = shallow(<Container {...props} />);
    const container = wrapper.instance();
    container.followLink('lang/type/cat/article');
  });
});
