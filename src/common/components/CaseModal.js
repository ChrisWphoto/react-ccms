import React from "react";
import {Modal, Popover, Tooltip, Button, OverlayTrigger} from 'react-bootstrap';

const CaseModal = React.createClass({

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
      <div>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Government Reclamation</Modal.Title>
          </Modal.Header>
          <Modal.Body>


            <h4>Popover in a modal</h4>
            <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

            <hr />

            <form className="form-signin">
               <h2 className="form-signin-heading">Please login</h2>

               <input type="text" className="form-control" name="firstName"
                 placeholder="First Name" required="true" autofocus="" />
               <input type="text" className="form-control" name="LastName"
                 placeholder="Last Name" required="true"/>

             <br/>
               <h2> Select User Type </h2>
               <div className="btn-group" style={{margin: '25px auto'}} role="group" aria-label="...">
                  <button type="button" name="caseMngr" className="btn btn-default"> <span className="glyphicon glyphicon-briefcase" aria-hidden="true"></span> Case Manager</button>
                  <button type="button" name='admin' className="btn btn-default"><span className="glyphicon glyphicon-globe" aria-hidden="true"></span> Admin</button>
               </div>
               <br/><br/>
               <button  >Login</button>
             </form>

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
