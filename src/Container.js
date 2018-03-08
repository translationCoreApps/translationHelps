import React from 'react';
import PropTypes from 'prop-types';
import {ipcRenderer} from 'electron';
import View from './components/View';
import { convertMarkdownLinks } from './helpers/tHelpsHelpers';

class Container extends React.Component {
  constructor(){
    super();
    this.state = {
      modalVisibility: false
    };
    this.followLink = this.followLink.bind(this);
  }

  followLink(link) {
    let linkParts = link.split('/'); // Could be a relative article link, e.g. en/tw/kt/inchrist, or a full URL, e.g. http://unfoldingword.org

    // If the link doesn't have 4 parts, like a relative article link should, or has http:, https: or ftp: treat it as an external link
    if (linkParts.length != 4 || ['http:', 'https:', 'ftp:'].includes(linkParts[0]) ) {
      if (!this.props.online) {
        let message = 'You are attempting to load an external resource in offline mode, please enable online mode to view this resource';
        this.setState({modalVisibility: true, modalView: message});
      } else ipcRenderer.send('open-helper', link);
    } else {
      const [languageId, type, articleCat, articleId] = linkParts;
      let resourceDir = type;
      switch (type) {
        case 'ta':
          resourceDir = 'translationAcademy';
          break;
        case 'tw':
          resourceDir = 'translationWords';
          break;
        default:
          break;
      }

      this.props.actions.loadResourceArticle(resourceDir, articleId, languageId, articleCat);
      let articleData = this.props.resourcesReducer.translationHelps[resourceDir][articleId];

      if (articleData) {
        this.setState({
          modalVisibility: true,
          modalView: articleData,
          articleCat: articleCat
        });
      } else {
        this.setState({
          modalVisibility: true,
          modalView: 'Cannot find specified file.'
        });
      }
    }
  }

  render() {
    const languageId = this.props.projectDetailsReducer.currentProjectToolsSelectedGL[this.props.toolsReducer.currentToolName];
    const followLink = this.followLink;
    const currentFile = convertMarkdownLinks(this.props.currentFile, languageId);
    const modalView = convertMarkdownLinks(this.state.modalView, languageId, this.state.articleCat);
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
