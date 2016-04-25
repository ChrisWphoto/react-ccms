import React from "react";
import {Modal, Popover, Tooltip, Button, OverlayTrigger,Accordion,Panel} from 'react-bootstrap';
import GovRecRecovery from './view-case/GovRec-recovery-view';
import GovRecDetails from './view-case/GovRec-details-view';
import EditGovRec from './view-case/GovRec-recovery-edit';
import EditGovRecDetails from './view-case/GovRec-details-edit';
import Audit from './view-case/Audit';


var ViewCaseModal = React.createClass({

  getInitialState() {
    return { showModal: false,
         theCase: {}, 
         edit: false,
         editGRDetails: false 
        };
  },

  close() {
    this.setState({ showModal: false });
  },

  onShow() {
    this.setState({marmot: "leanna"})
    console.log('Marmot');
  },

  open() {
    console.log('Opening Modal');
    this.setState({ showModal: true });
  },
  
  toggleEdit(){
        this.setState({edit: !this.state.edit});
  },
  
  toggleEditGRDetails(){
        this.setState({editGRDetails: !this.state.editGRDetails});
  },


  render() {
    var theCase = this.props.case || {};
    var noRecoveryMsg = "Not Completed";
    return (
      <div>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>

            <Modal.Title>
                <div style={{float:'right', marginRight: 30}}>
                    {theCase.currentStatus != "closed" ? <Button>Close</Button> : <Button>Open</Button> }
                    <Button >Watch</Button>
                </div>
                <b>{theCase.mainType}</b> <br/>For: <b>{theCase.benName}</b>
                <br/>
                Case:  <b>{theCase.currentStatus}</b>
                <br/><br/>
            </Modal.Title>

          </Modal.Header>
           <Modal.Body>
            {theCase.currentStatus != "closed" ? <Button onClick={this.toggleEdit} style={{float: 'right'}} >Edit</Button> : null }
                {/*Show ViewGovRec when edit is false */}
            {this.state.edit ? <EditGovRec theCase={this.props.case} /> : <GovRecRecovery theCase={this.props.case} />}
            
            <hr/>
            {theCase.currentStatus != "closed" ? <Button onClick={this.toggleEditGRDetails} style={{float: 'right'}} >Edit</Button> : null }
            {this.state.editGRDetails ? <EditGovRecDetails theCase={this.props.case} /> : <GovRecDetails theCase={this.props.case} />}

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
