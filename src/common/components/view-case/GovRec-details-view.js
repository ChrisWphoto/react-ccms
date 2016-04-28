import React from 'react';
import {Button} from 'react-bootstrap';
import Axios from 'axios';


var ViewGovRecRecovery  = React.createClass({
  getInitialState: function() {
    return {
      assignedName: "Fetching name from DB..."
    };
  },


  render: function() {
    return (
        <div>
            <h2>Case Details</h2>
            <h4>Assigned to: {this.props.newAssignedUser}</h4>
            <h4>Case ID: {this.props.theCase.caseId}</h4>
            <h4>Account Number: {this.props.theCase.benAccountNumber}</h4>
            <h4>SSN: {this.props.theCase.benSocialNumber}</h4>
        </div>
    );
  }

});

module.exports = ViewGovRecRecovery;
