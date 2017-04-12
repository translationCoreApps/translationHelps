
const api = window.ModuleApi;
const React = api.React;
const RB = api.ReactBootstrap;
const { Glyphicon } = RB;
const Markdown = require('react-remarkable');
const THelpsModal = require('./components/THelpsModal');
const style = require('./css/style');

class TranslationHelpsDisplay extends React.Component {
    render() {
        let { currentFile, modalFile } = this.props;
        if (currentFile) {
            return (
                <div style={style.translationHelpsContent}>
                  <style dangerouslySetInnerHTML={{
                    __html: [
                      '.remarkableStyling h1{',
                        'font-size: 19px;',
                        'font-weight: bold;',
                      '}',
                      '.remarkableStyling h2{',
                        'font-size: 14px;',
                        'font-weight: normal;',
                      '}'
                    ].join('\n')
                  }}>
                  </style>
                    <div onClick={this.props.showModal}>
                      <Glyphicon glyph={"new-window"}
                                 style={style.tHGlyphicon}/>
                    </div>
                    <THelpsModal show={this.props.modalVisibility}
                                 onHide={this.props.hideModal}>
                        <Markdown options={{html: true}} source={modalFile}/>
                    </THelpsModal>
                    <div className="remarkableStyling">
                        <Markdown options={{html: true}} source={currentFile} />
                    </div>
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }
}

module.exports = TranslationHelpsDisplay;
