import React from 'react';
import PropTypes from 'prop-types';
import View from './components/View';
import * as tHelpsHelpers from './helpers/tHelpsHelpers';

class Container extends React.Component {
  constructor(){
    super();
    this.state = {
      modalVisibility: false
    };
    this.followLink = this.followLink.bind(this);
  }

  followLink(link) {
    let linkParts = link.split('/'); // link format: <lang>/<resource>/<category>/<article>

    const [lang, type, category, article] = linkParts;
    const resourceDir = tHelpsHelpers.getResourceDirByType(type);

    this.props.actions.loadResourceArticle(resourceDir, article, lang, category);
    const articleData = this.props.resourcesReducer.translationHelps[resourceDir][article];

    let newState = {
      modalVisibility: true,
      articleCategory: category
    };
    if (articleData) {
      newState = {
        ...newState,
        modalView: articleData,
      };
    } else {
      newState = {
        ...newState,
        modalView: 'Cannot find an article for '+link
      };
    }
    this.setState(newState);
    return newState;
  }

  render() {
    const languageId = this.props.projectDetailsReducer.currentProjectToolsSelectedGL[this.props.toolsReducer.currentToolName];
    const followLink = this.followLink;
    const currentFile = tHelpsHelpers.convertMarkdownLinks(this.props.currentFile, languageId);
    const modalView = tHelpsHelpers.convertMarkdownLinks(this.state.modalView, languageId, this.state.articleCategory);
    window.followLink = followLink;
    return (
        <View
            modalVisibility={this.state.modalVisibility}
            currentFile={currentFile}
            modalFile={modalView || currentFile}
            showModal={() => this.setState({ modalVisibility: true })}
            hideModal={() => this.setState({ modalVisibility: false, modalView: null })}
        />
    );
  }
}

Container.propTypes = {
  translate: PropTypes.func,
  actions: PropTypes.shape({
    loadResourceArticle: PropTypes.func.isRequired
  }),
  currentFile: PropTypes.string,
  online: PropTypes.bool,
  projectDetailsReducer: PropTypes.shape({
    currentProjectToolsSelectedGL: PropTypes.object.isRequired
  }),
  resourcesReducer: PropTypes.shape({
    translationHelps: PropTypes.object.isRequired
  }),
  toolsReducer: PropTypes.shape({
    currentToolName: PropTypes.string.isRequired
  }),
};

export default Container;
