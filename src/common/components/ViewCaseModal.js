import React from "react";
import {Modal, Popover, Tooltip, Button, OverlayTrigger,Accordion,Panel} from 'react-bootstrap';
import GovRecRecovery from './view-case/GovRec-recovery-view';
import GovRecDetails from './view-case/GovRec-details-view';
import EditGovRec from './view-case/GovRec-recovery-edit';
import EditGovRecDetails from './view-case/GovRec-details-edit';
import Audit from './view-case/Audit';
import AssignUser from './view-case/AssignUser';
import Axios from 'axios';


var ViewCaseModal = React.createClass({

  getInitialState() {
    return {
         showModal: false,
         theCase: this.props.case || {},
         edit: false,
         editGRDetails: false,
         openAssignUser: false,
         assignedName: false
        };
  },

  getUserName(name) {
    if(name) {
      this.setState({assignedName: name});
    }else {

      //timeout so props can catch up
      window.setTimeout(() => {
        let usrId = this.props.case.userIdAssigned || "";
        console.log("Assigned UID", usrId);
        if (usrId){
          Axios.get("http://testccmsrestapi.herokuapp.com/finduserbyid?id=" + usrId)
          .then(function({data="No One"}) {
            console.log("found:", data.firstName );
            let fullName = data.firstName + " " + data.lastName;
            this.setState({assignedName: fullName });
          }.bind(this));
        } else {
          this.setState({assignedName: "No User Asigned Case" });
        }
      }, 100);
    }
  },

  getPaymentsById(caseId){
    console.log("Finding payments:", caseId);
    Axios.get("http://testccmsrestapi.herokuapp.com/findpaymentsbyid?caseId=" + caseId)
      .then( ({data}) => {
        console.log("getPaymentsById:", data);
        //save payment array to payments in state
        this.setState({payments: data});
      });
  },

  componentWillReceiveProps(nextProps){
    this.setState({theCase: nextProps.case || {} });
  },

  refreshCaseData(caseId){
    console.log("refreshCaseData of", caseId);
    this.getPaymentsById(caseId);
    Axios.get("http://testccmsrestapi.herokuapp.com/findcasebyid?caseId=" + caseId)
      .then( ({data}) => {
        console.log("getCaseById:", data);
        //save payment array to payments in state
        this.setState({theCase: data});
      });
  },

  close() {
    this.setState({
      showModal: false,
      assignedName: false,
      openAssignUser: false,
      edit: false,
      editGRDetails: false
    });
    //refresh cases on Dashboard
    window.setTimeout( () => this.props.refreshCases(), 10 );
  },

  onShow() {
    this.setState({marmot: "leanna"})
    console.log('Marmot');
  },

  open() {
    this.setState({ showModal: true });
    this.getUserName();
  },

  toggleEdit(){
        this.setState({edit: !this.state.edit});
        this.getPaymentsById(this.props.case.caseId);
  },

  toggleEditGRDetails(){
        this.setState({editGRDetails: !this.state.editGRDetails});

  },

  openAssignUser(){
    this.setState({openAssignUser: !this.state.openAssignUser});
  },

  render() {
    var noRecoveryMsg = "Not Completed";
    return (
      <div>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>

            <Modal.Title>
              <div style={{float:'right', marginRight: 30}}>
                <Button onClick={this.openAssignUser}>{this.state.openAssignUser ? "Finished":"Assign Case"}  </Button>
                {this.state.theCase.currentStatus != "closed" ? <Button>Close</Button> : <Button>Open</Button> }
                <Button >Watch</Button>
              </div>
              <b>{this.state.theCase.mainType}</b> <br/>For: <b>{this.state.theCase.benName}</b>
              <br/>
              Case: <b>{this.state.theCase.currentStatus}</b>
              <br/><br/>
            </Modal.Title>
          </Modal.Header>
           <Modal.Body>
             <AssignUser updateAssignedUser={this.getUserName} caseId={this.state.theCase.caseId} active={this.state.openAssignUser} />
            {this.state.theCase.currentStatus != "closed" ? <Button onClick={this.toggleEdit} style={{float: 'right'}}>{this.state.edit ? "Save Edits":"Edit"}</Button> : null }
                {/*Show ViewGovRec when edit is false */}
            {this.state.edit ? <EditGovRec toggleEdit={this.toggleEdit} refreshCaseData={this.refreshCaseData} payments={this.state.payments} theCase={this.state.theCase} /> : <GovRecRecovery theCase={this.state.theCase} />}
            <hr/>
            {this.state.theCase.currentStatus != "closed" ? <Button onClick={this.toggleEditGRDetails} style={{float: 'right'}} >{this.state.editGRDetails ? "Save Edits":"Edit"}</Button> : null }
            {this.state.editGRDetails ? <EditGovRecDetails theCase={this.props.case} /> : <GovRecDetails newAssignedUser={this.state.assignedName} theCase={this.props.case} />}
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
