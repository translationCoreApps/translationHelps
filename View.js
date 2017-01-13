
const api = window.ModuleApi;
const React = api.React;
const RB = api.ReactBootstrap;
const { Glyphicon } = RB;
const Markdown = require('react-remarkable');
const THelpsModal = require('./components/THelpsModal');
const style = require('./css/style');

class TranslationHelpsDisplay extends React.Component {
    render() {
        let { currentFile } = this.props;
        if (currentFile) {
            return (
                <div style={style.translationHelpsContent}>
                    <div onClick={this.props.showModal}>
                      <Glyphicon glyph={"new-window"}
                                 style={style.tHGlyphicon}/>
                    </div>
                    <THelpsModal show={this.props.modalVisibility}
                                 onHide={this.props.hideModal}>
                        <Markdown source={currentFile} />
                    </THelpsModal>
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
