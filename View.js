
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
      var page = document.getElementById("helpsbody");
      if (page) {
        page.scrollTop = 0;
      }
      return (
        <div style={{flex: 'auto', display: 'flex'}}>
          <style dangerouslySetInnerHTML={{
            __html: [
              '.remarkableStyling h1{',
              'font-size: 19px;',
              'font-weight: bold;',
              '}',
              '.remarkableStyling h2{',
              'font-size: 14px;',
              'font-weight: normal;',
              '}',
              '.remarkableStyling h3{',
              'font-size: 16px;',
              'font-weight: bold;',
              '}',
              '.remarkableStyling h4{',
              'font-size: 16px;',
              'font-weight: bold;',
              '}',
              '.remarkableStyling blockquote {',
              'font-size: small;',
              '}',
              '.remarkableStyling blockquote strong {',
              'text-decoration: underline;',
              'font-weight: normal;',
              '}'
            ].join('\n')
          }}>
          </style>
          <div style={style.helpsContent}>
            <div style={style.helpsHeader}>
              <Glyphicon glyph={"fullscreen"}
                         title="Click to show expanded helps"
                         onClick={this.props.showModal}
                         style={style.helpsIcon} />
            </div>
            <div id="helpsbody" className="remarkableStyling" style={style.helpsBody}>
              <Markdown options={{ html: true }} source={currentFile} />
            </div>
          </div>
          <THelpsModal show={this.props.modalVisibility}
            onHide={this.props.hideModal}>
            <Markdown options={{ html: true }} source={modalFile} />
          </THelpsModal>
        </div>
      );
    }
    else {
      return (<div></div>);
    }
  }
}

module.exports = TranslationHelpsDisplay;
