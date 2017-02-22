const api = window.ModuleApi;
const React = api.React;
const ReactBootstrap = api.ReactBootstrap;
const View = require('./View');
const fs = require(window.__base + 'node_modules/fs-extra');

const NAMESPACE = 'TranslationHelps';

class Container extends React.Component {
  constructor(){
    super();
    this.state = {
      modalVisibility: false,
    }
    this.wordList = api.getDataFromCheckStore(NAMESPACE, 'wordList');
    this.sectionList = api.getDataFromCheckStore(NAMESPACE, 'sectionList');
    this.followLink = this.followLink.bind(this);
  }
  convertToMarkdown(src) {
    if (!src) return src;
    let replaced = src.replace(/(=+)([^=]+)\1/g, function(match, equals, header) {
        switch(equals.length) {
            case 6:
                return "##" + header;
            case 5:
                return "####" + header;
            default:
                return "#####" + header;
        }
    });
    let followLink = this.followLink;
    window.followLink = followLink;
    return replaced.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" onclick="return followLink(\'$2\')">$1</a>');

  }

  followLink(word) {
    var currentWord = word.split('/');
    let currentWordFile = currentWord[currentWord.length-1].split('.')[0]+ '.txt';
    var found = null;
    for (var i in this.wordList) {
      if (this.wordList[i].name.trim() == currentWordFile.trim()) {
        found = this.wordList[i].file;
      }
    }
    if (!found) {
        currentWordFile = this.sectionList[currentWord[currentWord.length-1]];
        if (currentWordFile) {
          found = currentWordFile.file;
          let title = found.match(/title: .*/)[0].replace('title: ', '');
          found = found.replace(/---[\s\S]+---/g, '');
          found = '## ' + title + '\n' + found;
        } else {
          try {
            found = fs.readFileSync(__dirname + '/static/words/' + currentWord[currentWord.length-1]).toString();
          } catch(err) {
            console.log(this.props.online ? "You are online" : "You are offline");
            console.log("Found = ", found);
            if(!this.props.online && !found){
              this.setState({modalVisibility: true, modalView: "You are attempting to load an external resource in offline mode, please enable online mode to view this resource"});
              return false;
            }
            console.log(err);
            return true;
          }
        }
    }
    this.setState({
      modalVisibility: true,
      modalView: found
    });
    return false;
  }

  render() {
    let { currentFile} = this.props;
    currentFile = this.convertToMarkdown(currentFile)
    let modalView = this.convertToMarkdown(this.state.modalView)
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
