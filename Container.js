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
    let { dataList } = this.props;
    var found = null;

    if (type === "note") {
      found = dataList[link + ".md"];
      if (!found) {
        found = dataList["translate_" + link + ".md"];
      }
      if (found && found.file) {
        this.setState({
          modalVisibility: true,
          modalView: found.file
        });
        return true;
      }
      this.setState({
        modalVisibility: true,
        modalView: "Cannot find specified file."
      });
      return true;
    }

    if (type === "word") {
      found = dataList.filter((wordObject) => {
        return wordObject.name === link + '.txt';
      });
      if (found && found[0] && found[0].file) {
        this.setState({
          modalVisibility: true,
          modalView: found[0].file
        });
        return true;
      }
      this.setState({
        modalVisibility: true,
        modalView: "Cannot find specified file."
      });
      return true;
    }

    if (type === "url") {
      if (!this.props.online) {
        this.setState({modalVisibility: true, modalView: "You are attempting to load an external resource in offline mode, please enable online mode to view this resource"});
        return true;
      }
      ipcRenderer.send('open-helper', link);
      return true;
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
