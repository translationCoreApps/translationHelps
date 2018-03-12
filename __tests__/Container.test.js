/* eslint-env jest */
import React from 'react';
import Container from '../src/Container';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const props = {
  translate: k=>k,
  actions: {
    loadResourceArticle: jest.fn((lang, type, cat, article)=>{
      return lang+', '+type+', '+cat+', '+article;
    })
  },
  currentFile: '# test #\n\nThis is a [test](rc://en/ta/man/translate/test)',
  online: true,
  projectDetailsReducer: {
    currentProjectToolsSelectedGL: {'testTool': 'en'}
  },
  resourcesReducer: {
    translationHelps: {'type': {
      'validArticle': 'Valid Article Content'
    }}
  },
  toolsReducer: {
    currentToolName: 'testTool'
  },
};

describe('Container Tests', () => {
  it('Test Container', () => {
    const wrapper = shallow(<Container {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Test Container.followLink() with valid article', () => {
    const wrapper = shallow(<Container {...props} />);
    const container = wrapper.instance();
    const link = 'lang/type/cat/validArticle';
    const [lang, type, category, article] = link.split('/');
    const state = container.followLink(link);
    expect(props.actions.loadResourceArticle).toHaveBeenCalled();
    expect(props.actions.loadResourceArticle).toBeCalledWith(type, article, lang, category);
    expect(state).toEqual({
      articleCategory: 'cat',
      modalView: 'Valid Article Content',
      modalVisibility: true
    });
  });

  it('Test Container.followLink() with invalid article', () => {
    const wrapper = shallow(<Container {...props} />);
    const container = wrapper.instance();
    const link = 'lang/type/cat/invalidArticle';
    const [lang, type, category, article] = link.split('/');
    const state = container.followLink(link);
    expect(props.actions.loadResourceArticle).toHaveBeenCalled();
    expect(props.actions.loadResourceArticle).toBeCalledWith(type, article, lang, category);
    expect(state).toEqual({
      articleCategory: 'cat',
      modalView: 'Cannot find an article for lang/type/cat/invalidArticle',
      modalVisibility: true
    });
  });
});
