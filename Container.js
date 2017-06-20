import React from 'react';
import View from './View';
import fs from 'fs-extra';
import {ipcRenderer} from 'electron';
// constant declaration
const urlRegex = new RegExp("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})");
const NAMESPACE = 'TranslationHelps';

class Container extends React.Component {
  constructor(){
    super();
    this.state = {
      modalVisibility: false,
    };
    this.followLink = this.followLink.bind(this);
  }
  convertToMarkdown(src) {
    if (!src) return src;

    let followLink = this.followLink;
    window.followLink = followLink;

    src = src.replace(/-{3}\ntitle: ([^\n]+)[^]+-{3}/g, '===== $1 =====');

    src = src.replace(/(=+)([^=]+)\1/g, function(match, equals, header) {
        switch(equals.length) {
            case 6:
                return "#" + header + "#";
            case 5:
                return "#" + header + "#";
            case 4:
              return "##" + header + "##";
            case 3:
              return "###" + header + "###";
            case 2:
              return "####" + header + "####";
            default:
                return "#####" + header + "#####";
        }
    });

    src = src.replace(/(\/\/)(?!git|cdn|ufw)/g, "_");
    src = src.replace(/\[([^\]]+)\]\((en\/tn\/obs[^)]+)\)/g, 'Open Bible Stories $1');
    src = src.replace(/\[([^\]]+)\]\((en\/tn\/[^)]+)\)/g, '$1');
    src = src.replace(/\[\[en:bible[^|]+\|([^\]]+)\]\]/g, '$1');
    src = src.replace(/\[\[(en:ta:[^\|\]:]+:[^\|\]:]+:)([^\|\]:]+)\|([^\]]+)\]\]/g, '<a style="cursor: pointer" onclick="return followLink(\'$2\', \'note\')">$3</a>');
    src = src.replace(/\[\[(en:ta:[^\|\]:]+:[^\|\]:]+:)([^\|\]:]+)\]\]/g, '<a style="cursor: pointer" onclick="return followLink(\'$2\', \'note\')">$2</a>');
    src = src.replace(/\[([^\]]+)\]\(\.\.\/(other|kt)\/([^\.)]+)\.md\)/g, '<a style="cursor: pointer" onclick="return followLink(\'$3\', \'word\')">$1</a>');
    src = src.replace(/\[([^\]]+)\]\(([^)\.]+)\.md\)/g, '<a style="cursor: pointer" onclick="return followLink(\'$2\', \'note\')">$1</a>');
    src = src.replace(/\[([^\]]+)\]\([^\])]+master\/content\/([^)\.]+)\.md\)/g, '<a style="cursor: pointer" onclick="return followLink(\'$2\', \'note\')">$1</a>');

    return src;
  }

  followLink(link, type) {
    if (type === 'url') {
      if (!this.props.online) {
        let message = 'You are attempting to load an external resource in offline mode, please enable online mode to view this resource';
        this.setState({modalVisibility: true, modalView: message});
      } else ipcRenderer.send('open-helper', link);
    } else {
      let resourceType;
      switch (type) {
        case 'note':
          resourceType = 'translationAcademy';
          break;
        case 'word':
          resourceType = 'translationWords';
          break;
        default:
          break;
      }

      let articleId = link;
      this.props.actions.loadResourceArticle(resourceType, articleId);
      let articleData = this.props.resourcesReducer.translationHelps[resourceType][articleId];

      if (articleData) {
        this.setState({
          modalVisibility: true,
          modalView: articleData
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
    let { currentFile } = this.props;
    currentFile = this.convertToMarkdown(currentFile);
    let modalView = this.convertToMarkdown(this.state.modalView);
    return (
        <View
            modalVisibility={this.state.modalVisibility}
            currentFile={currentFile}
            modalFile={modalView|| currentFile}
            showModal={() => this.setState({ modalVisibility: true })}
            hideModal={() => this.setState({ modalVisibility: false, modalView: null })}
        />
    );
  }
}

module.exports = {
    name: NAMESPACE,
    container: Container
}
