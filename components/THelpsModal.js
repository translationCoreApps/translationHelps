/**
  * @author      Manny Colon
  * @description This component displays a modal when the user clicks the
  * new-window glyphicon button on translationHelps component.
******************************************************************************/
const api = window.ModuleApi;
const React = api.React;
const RB = api.ReactBootstrap;
const {Modal, Button, FormControl} = RB;
const style = require('../css/style');

class THelpsModal extends React.Component {
  render() {
    let { onHide, children } = this.props;

    return (
      <Modal {...this.props} bsSize="lg" aria-labelledby="contained-modal-title-sm">
        <Modal.Header style={{backgroundColor: "var(--background-color-light)", borderColor: "var(--text-color)"}} closeButton>
          <Modal.Title id="contained-modal-title-sm"
                      style={style.modalTitle}>
              translationHelps
          </Modal.Title>
        </Modal.Header>
          <Modal.Body style={style.tHModalContent}>
            {children}
          </Modal.Body>
        <Modal.Footer style={{backgroundColor: "var(--background-color-light)", borderColor: "var(--text-color)"}}>
          <Button bsStyle="prime" onClick={() => onHide()}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

module.exports = THelpsModal;
