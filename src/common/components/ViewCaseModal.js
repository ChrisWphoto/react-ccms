import React from "react";
import {Modal, Popover, Tooltip, Button, OverlayTrigger,Accordion,Panel} from 'react-bootstrap';
import ViewGovRec from './ViewCase-Govrec';
import EditGovRec from './GovRecType1Form';


var ViewCaseModal = React.createClass({

  getInitialState() {
    return { showModal: false, theCase: 'hello', edit: false };
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
             <Button onClick={this.toggleEdit} style={{marginLeft: '68%'}} >Edit</Button>
             {theCase.currentStatus != "closed" ? <Button>Close</Button> : <Button>Open</Button> }
             <Button >Watch</Button>
            </Modal.Title>

          </Modal.Header>
           <Modal.Body>
           {/*Show ViewGovRec when state is  data */}
           {this.state.edit ? <EditGovRec /> : <ViewGovRec theCase ={this.props.case} />}
           
            
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
