import React from "react";
import {Modal, Popover, Tooltip, Button, OverlayTrigger} from 'react-bootstrap';
import GovRecType1Form from "./GovRecType1Form";

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
    let popover = <Popover title="Enter SSN Carefully">We Provide Tips on what to enter</Popover>;

    return (
      <div >

        <Modal show={this.state.showModal} ref={'hello'} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title><b>Case Creation For: Government Reclamation</b></Modal.Title>
          </Modal.Header>
          <Modal.Body >
            
            <GovRecType1Form />

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = CaseModal;
