import React from "react";
import {Modal, Popover, Tooltip, Button, OverlayTrigger} from 'react-bootstrap';
import TreasuryForm from "./TreasuryForm";

var TreasuryModal = React.createClass({

  getInitialState() {
    return { showModal: false };
  },


  close() {
    this.setState({ showModal: false });
  },

  open() {
    console.log('Opening Treasury');
    this.setState({ showModal: true });
  },

  render() {

    return (
      <div >

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Case Creation: <b>Treasury Referral</b> </Modal.Title>
          </Modal.Header>
          <Modal.Body >

            <TreasuryForm closeModal={this.close} />

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = TreasuryModal;
