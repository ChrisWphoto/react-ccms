import React from 'react';



var ViewGovRec  = React.createClass({
  
  render: function() {
    return (
        <div>
            <h2>Recovery Details</h2>
            <h4>Amount Paid: ${this.props.theCase.totalAmount}</h4>
            <h4>Full Recovery: </h4>
            <h4>Completed Date: {this.props.theCase.benAccountNumber}</h4>
            <h4>Verified by: Chris Walter on Date 3/15/2016</h4>

            <hr/>
            <h2>Case Details</h2>
            <h4>Assigned to: {this.props.theCase.assigned}</h4>
            <h4>Case ID: {this.props.theCase.id}</h4>
            <h4>Account Number: {this.props.theCase.benAccountNumber}</h4>
            <h4>SSN: {this.props.theCase.benSocialNumber}</h4>
            <h4>Account Number: {this.props.theCase.benAccountNumber}</h4>

            <hr/>
            <h2>Case Audit</h2>
            <h5><b>Chris</b> updated Amount Paid - 3/15/2016 </h5>
            <h5><b>Joel</b> updated Assigned To - 3/14/2016 </h5>
        </div>
    );
  }

});

module.exports = ViewGovRec;
