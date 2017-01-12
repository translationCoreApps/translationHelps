
const api = window.ModuleApi;
const React = api.React;
const ReactBootstrap = api.ReactBootstrap;
const Markdown = require('react-remarkable');
const style = require('./css/style');

class TranslationHelpsDisplay extends React.Component {
    render() {
        let { currentFile } = this.props;
        if (currentFile) {
            return (
                <div style={style.translationHelpsContent}>
                    <div>
                        <Markdown source={currentFile} />
                    </div>
                </div>
            );
        }
        else {
            console.error('Source for TranslationWordsDisplay is undefined');
            return (<div></div>);
        }
    }
}

module.exports = TranslationHelpsDisplay;
