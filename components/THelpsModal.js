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
        <Modal.Header style={{backgroundColor: "#e7e7e7"}} closeButton>
          <Modal.Title id="contained-modal-title-sm"
                      style={style.modalTitle}>
              translationHelps
          </Modal.Title>
        </Modal.Header>
          <Modal.Body style={style.tHModalContent}>
            {children}
          </Modal.Body>
        <Modal.Footer style={{backgroundColor: "#e7e7e7"}}>
          <Button bsStyle="danger" onClick={() => onHide()}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

module.exports = THelpsModal;
