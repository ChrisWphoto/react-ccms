import React from 'react';
import {Button} from 'react-bootstrap';


var ViewGovRec  = React.createClass({

  getInitialState: function() {
    return {
      completedDate: null,
      dateVerified: null,
    };
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.theCase.completedDate)
      var acompletedDate = nextProps.theCase.completedDate.substr( 0, nextProps.theCase.completedDate.indexOf('T') );
    if (nextProps.theCase.dateVerified)
      var adateVerified = nextProps.theCase.dateVerified.substr( 0, nextProps.theCase.dateVerified.indexOf('T') );
    this.setState({
      completedDate: acompletedDate,
      dateVerified: adateVerified
    });
  },

  render: function() {
    return (
        <div>

            <h2>Recovery Details</h2>
            <h4>Amount Paid: ${this.props.theCase.totalAmount}</h4>
            <h4>Full Recovery: {this.props.theCase.fullRecovery ? "Yes" : "No"}</h4>
            <h4>Completed Date: {this.state.completedDate}</h4>
            <h4>Verified by:  Joel Wiebe on {this.state.dateVerified}</h4>
            <h4> Notes: {this.props.theCase.additionalNotes}</h4>
        </div>
    );
  }
});

module.exports = ViewGovRec;
