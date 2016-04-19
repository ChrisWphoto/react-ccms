import React from "react";
import {Modal, Popover, Tooltip, Button, OverlayTrigger} from 'react-bootstrap';

var ViewTreasuryModal = React.createClass({

  getInitialState() {
    return { showModal: false, theCase: 'hello' };
  },


  close() {
    this.setState({ showModal: false });
  },

  onShow() {
    this.setState({marmot: "tookie know"})
    console.log('Marmot');
  },

  open() {
    console.log('Opening Modal');
    this.setState({ showModal: true });
  },



  render() {
    var theCase = this.props.case ? this.props.case : "Not Loaded Yet";
    var noRecoveryMsg = "Not Completed";
    return (
      <div>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>

            <Modal.Title>
              <b>{theCase.mainType}</b> For: <b>{theCase.benName}</b>
              <br/>
              Case:  <b>{theCase.currentStatus}</b>

              <br/><br/>
              <Button style={{marginLeft: '68%'}} >Edit</Button>
              {theCase.currentStatus != "closed" ? <Button>Close</Button> : <Button>Open</Button> }
              <Button >Watch</Button>
            </Modal.Title>

          </Modal.Header>
          <Modal.Body>


            <h2>Recovery Details</h2>
            <h4>Amount Paid: ${theCase.totalAmount}</h4>
            <h4>Full Recovery: {theCase.fullRecovery ? theCase.fullRecovery : noRecoveryMsg}</h4>
            <h4>Completed Date: {theCase.benAccountNumber}</h4>
            <h4>Verified by: Chris Walter on Date 3/15/2016</h4>

            <hr/>
            <h2>Case Details</h2>
            <h4>Assigned to: {theCase.assigned}</h4>
            <h4>Case ID: {theCase.id}</h4>
            <h4>Account Number: {theCase.benAccountNumber}</h4>
            <h4>SSN: {theCase.benSocialNumber}</h4>
            <h4>Account Number: {theCase.benAccountNumber}</h4>

            <hr/>
            <h2>Case Audit</h2>
            <h5><b>Chris</b> updated Amount Paid - 3/15/2016 </h5>
            <h5><b>Joel</b> updated Assigned To - 3/14/2016 </h5>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close Modal</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = ViewTreasuryModal;
