import React from 'react';
import {Button} from 'react-bootstrap';


var ViewGovRecRecovery  = React.createClass({
  
  render: function() {
    return (
        <div>
            <h2>Case Details</h2>
            <h4>Assigned to: {this.props.theCase.assigned}</h4>
            <h4>Case ID: {this.props.theCase.id}</h4>
            <h4>Account Number: {this.props.theCase.benAccountNumber}</h4>
            <h4>SSN: {this.props.theCase.benSocialNumber}</h4>
            <h4>Account Number: {this.props.theCase.benAccountNumber}</h4>
        </div>
    );
  }

});

module.exports = ViewGovRecRecovery;
