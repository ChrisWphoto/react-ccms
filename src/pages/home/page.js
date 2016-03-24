import React from "react";
import Griddle from 'griddle-react';
import styles from "./style.css";
import restCalls from '../../utils/restCalls';
import { browserHistory } from 'react-router';
import CaseModal from '../../common/components/CaseModal';
import ViewCaseModal from '../../common/components/ViewCaseModal';
import {Nav, NavDropdown,Navbar, NavItem, MenuItem} from 'react-bootstrap';

var meta = [
  {
    "columnName": "id",
    "order": 1,
    "locked": false,
    "visible": true,
    "displayName": "Case ID"
  },
  {
    "columnName": "benName",
    "order": 2,
    "locked": false,
    "visible": true,
    "displayName": "Beneficiary Name"
  },
  {
    "columnName": "totalAmount",
    "order": 3,
    "locked": false,
    "visible": true,
    "displayName": "Total Amount"
  },
  {
    "columnName": "SLA",
    "order": 4,
    "locked": false,
    "visible": true,
    "displayName": "SLA"
  },
  {
    "columnName": "Number of Days Open",
    "order": 5,
    "locked": false,
    "visible": true,
    "displayName": "Days Open"
  },
  {
    "columnName": "status",
    "order": 6,
    "locked": false,
    "visible": true,
    "displayName": "Status"
  }

];

var HomePage = React.createClass ({

  getInitialState: function(){
     return {
       userInfo: JSON.parse(window.localStorage.getItem('user')),
       currentCaseData: "No Case Selected"
     }
  },

  componentDidMount: function() {
    restCalls.getDashboardInfo()
      .then(function(allCases){
        this.setState({cases: allCases});
    }.bind(this))

  },

  logOut: function(){
    window.localStorage.removeItem('user');
    browserHistory.push('/');
  },

  openGovRecModal: function () {
    this.refs.govRecCaseModal.open();
  },

  //wrapping caseData attributes in H3 html element
  //TODO should move this to an onShow() function in Modal
  parseCaseData(theCase){
    return Object.keys(theCase).map( (theKey, idx) => <h3 key={idx} > {theCase[theKey]} </h3>);
  },

// open modal to view all case details
  rowClick: function (e) {
    // setState is how the case is updated in the viewCaseModal
    this.setState({currentCaseData: this.parseCaseData(e.props.data)});
    this.refs.viewCaseModal.open();
  },

  render() {
    return (
      <div className={styles.content}>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">CCMS</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} active={true} href="#">Dashboard</NavItem>
              <NavDropdown eventKey={3} title="Add Case" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1} onClick={this.openGovRecModal}>Government Reclamation</MenuItem>
                <MenuItem eventKey={3.2}>Type 2</MenuItem>
                <MenuItem eventKey={3.3}>Type 3</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Special</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav >
              <NavItem eventKey={1} onClick={this.logOut}>Log out</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <br/>
        <h1 > Cases for {this.state.userInfo.firstName} {this.state.userInfo.LastName}</h1>
        <br/>

        <Griddle
          results={this.state.cases}
          tableClassName="table" showFilter={true}
          showSettings={true}
          columns={["id", "benName", "totalAmount", "SLA", 'Number of Days Open', 'status']}
          noDataMessage={"No Cases to Display. Try Refreshing the page or click Add New above."}
          onRowClick={this.rowClick}
          reultsPerPage={15}
          filterPlaceholderText={"Search"}
          columnMetadata={meta}
        />


        {/* This is the modal that is rendered when a row is click
        currentCaseData is passed a property which the modal can render*/}
      <ViewCaseModal case={this.state.currentCaseData} ref={'viewCaseModal'} />
      <CaseModal case={this.state.currentCaseData} ref={'govRecCaseModal'} />

      </div>
    );
  }
})

module.exports = HomePage;
