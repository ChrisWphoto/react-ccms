import React from "react";
import {Modal, Popover, Tooltip, Button, OverlayTrigger} from 'react-bootstrap';

var ViewCaseModal = React.createClass({

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
    // var theCase = this.props.case;

    return (
      <div>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Viewing case for:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button >Edit</Button>
            <Button >Close</Button>
            <Button >Watch</Button>
            <hr/>
          {this.props.case}


          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close Modal</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = ViewCaseModal;
