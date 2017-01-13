
const api = window.ModuleApi;
const React = api.React;
const ReactBootstrap = api.ReactBootstrap;
const View = require('./View');

const NAMESPACE = 'TranslationHelps';

class Container extends React.Component {
  constructor(){
    super();
    this.state = {
      modalVisibility: false,
    }
  }
  convertToMarkdown(src) {
        return src.replace(/(=+)([^=]+)\1/g, function(match, equals, header) {
            switch(equals.length) {
                case 6:
                    return "##" + header;
                case 5:
                    return "####" + header;
                default:
                    return "#####" + header;
            }
        });
  }
  render() {
    let { currentFile } = this.props;
    return (
        <View
            modalVisibility={this.state.modalVisibility}
            currentFile={this.convertToMarkdown(currentFile)}
            showModal={() => this.setState({ modalVisibility: true })}
            hideModal={() => this.setState({ modalVisibility: false })}
        />
    );
  }
}

module.exports = {
    name: NAMESPACE,
    container: Container
}
