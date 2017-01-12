
const api = window.ModuleApi;
const React = api.React;
const ReactBootstrap = api.ReactBootstrap;
const View = require('./View');

const NAMESPACE = 'TranslationHelps';

class Container extends React.Component {
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
            currentFile={this.convertToMarkdown(currentFile)}
        />
    );
  }
}

module.exports = {
    name: NAMESPACE,
    container: Container
}
