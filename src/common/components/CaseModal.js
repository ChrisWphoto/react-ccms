import React from "react";
import {Modal, Popover, Tooltip, Button, OverlayTrigger,Accordion,Panel} from 'react-bootstrap';
import GovRecType1Form from "./GovRecType1Form";
import GovDetailForm from "./GovDetailForm";

var CaseModal = React.createClass({

  getInitialState() {
    return { showModal: false };
  },


  close() {
    this.setState({ showModal: false });
  },

  open() {
    console.log('Opening Modal');

    this.setState({ showModal: true });
  },

  render() {

    return (
      <div >

        <Modal show={this.state.showModal} onHide={this.close}> <Accordion>
          <Panel header={<Modal.Header closeButton><Modal.Title>Case Creation: <b>Government Reclamation</b> </Modal.Title> </Modal.Header>}eventKey="1">
            <Modal.Body ><GovRecType1Form refreshCases={this.props.refreshCases} closeModal={this.close} /></Modal.Body>
            <Modal.Footer><Button onClick={this.close}>Close</Button></Modal.Footer>
          </Panel>
          <Panel header="Case Details" eventKey="2"><GovDetailForm refreshCases={this.props.refreshCases} closeModal={this.close} />
            <Button onClick={this.close}>Close</Button>
          </Panel>
        </Accordion>
        </Modal>

      </div>
    );
  }
});

module.exports = CaseModal;
