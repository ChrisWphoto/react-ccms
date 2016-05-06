import React from "react";
import Griddle from 'griddle-react';
import styles from "./style.css";
import restCalls from '../../utils/restCalls';
import { browserHistory } from 'react-router';
import AddNewCaseModal from '../../common/components/CaseModal';
import ViewCaseModal from '../../common/components/ViewCaseModal';
import TreasuryModal from '../../common/components/TreasuryModal';
import ViewTreasuryModal from '../../common/components/ViewTreasuryModal';
import NachaDrop from '../../common/components/NachaDrop';
import {Nav, NavDropdown,Navbar, NavItem, MenuItem, Button,Accordion,Panel} from 'react-bootstrap';

var HomePage = React.createClass ({

  getInitialState: function(){
    return {
      userInfo: JSON.parse(window.localStorage.getItem('user')),
      currentCaseData: "No Case Selected"
    }
  },

  calcDayDelta: function(theCase){
    let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    let dateCaseOpened = new Date(theCase.dateCreated);
    let numDaysOpened = Math.round(Math.abs((Date.now() - dateCaseOpened.getTime())/(oneDay)));
    theCase.daysOpen = numDaysOpened;
    return theCase;
  },

  closedCases: function(){
    //set cases to empty object
    this.setState({ cases: {} })
    //request all the cases from DB
    restCalls.getDashboardInfo()
        //after those cases come back pass to allCases
        .then(function(allCases){
          //for each case obj in all cases calc how long it has been open

          var closedCases = allCases.filter(function(aCase){
            return aCase.currentStatus == "closed";
          });
          closedCases.map( theCase => this.calcDayDelta(theCase) );
          this.setState({cases: closedCases});

        }.bind(this))
  },

  allCases: function(){
    //request all the cases from DB
    restCalls.getDashboardInfo()
      //after those cases come back pass to allCases
      .then(function(allCases){
        //for each case obj in all cases calc how long it has been open

        allCases.map( theCase => this.calcDayDelta(theCase) );
        this.setState({cases: allCases});
      }.bind(this))
  },

  myCases: function(){
    //set cases to empty object
    this.setState({ cases: {} })
    //request all the cases from DB
    restCalls.getDashboardInfo()
        //after those cases come back pass to allCases
        .then(function(allCases){
          //for each case obj in all cases calc how long it has been open

          //allCases = [ {assignedto:1}, {assignedto:2} ]
          var myCasesMutated = allCases.filter(function(aCase){
            return aCase.userIdAssigned == "8";
          });
          if (myCasesMutated.length > 0)
            myCasesMutated.map( theCase => this.calcDayDelta(theCase) );

          this.setState({cases: myCasesMutated});

        }.bind(this))
  },

  componentDidMount: function() {
    this.allCases();
  },

  logOut: function(){
    window.localStorage.removeItem('user');
    browserHistory.push('/');
  },

  openGovRecModal: function () {
    this.refs.govRecCaseModal.open();
  },

  openTresModal: function () {
    this.refs.tresModal.open();
  },

  //wrapping caseData attributes in H3 html element
  //TODO should move this to an onShow() function in Modal
  parseCaseData(theCase){
    return Object.keys(theCase).map( (theKey, idx) => <h3 key={idx} > {theCase[theKey]} </h3>);
  },


// open modal to view all case details
  rowClick: function (rowCaseData) {
    //setting state allows us to update data in viewCaseModal
    this.setState({caseData: rowCaseData.props.data});
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
                <MenuItem eventKey={3.2} onClick={this.openTresModal}>Treasury Form</MenuItem>
              </NavDropdown>
              <NavDropdown eventKey={5} title="Case Views" id="basic-nav-dropdown">
                <MenuItem eventKey={5.1}  onClick={this.allCases} >All Cases</MenuItem>
                <MenuItem eventKey={5.2}  onClick={this.myCases} >My Cases</MenuItem>
                <MenuItem eventKey={5.2}  onClick={this.closedCases} >Closed Cases</MenuItem>
              </NavDropdown>
              <NavItem eventKey={1} onClick={this.logOut}>Log out</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <NachaDrop className={styles.dropbox} refreshCases={this.allCases} />
        <br/>
        <h1 className={styles.welcomeText} > Cases for {this.state.userInfo.firstName} {this.state.userInfo.LastName} </h1>
        <br/>

      <Griddle
          results={this.state.cases}
          tableClassName="table" showFilter={true}
          showSettings={true}
          columns={["caseId","benName", "totalAmount", "sla", 'daysOpen', 'currentStatus']}
          noDataMessage={"No Cases to Display. Try Refreshing the page or click Add New above."}
          onRowClick={this.rowClick}
          enableInfiniteScroll={true}
          bodyHeight={500}
          filterPlaceholderText={"Search"}
          columnMetadata={meta}
          initialSort={"dateCreated"}
          initialSortAscending={false}
        />

        {/* This is the modal that is rendered when a row is click
         currentCaseData is passed as a property which the modal can render*/}
        <ViewCaseModal  refreshCases={this.allCases} case={this.state.caseData} ref={'viewCaseModal'} />
        <AddNewCaseModal refreshCases={this.allCases} ref={'govRecCaseModal'} />
        <ViewTreasuryModal  case={this.state.caseData} ref={'viewTreasuryModal'} />
        <TreasuryModal refreshCases={this.allCases} ref={'tresModal'} />
      </div>
    );
  }
})

var meta = [
  {
    "columnName": "caseId",
    "order": 1,
    "locked": false,
    "visible": true,
    "displayName": "Case ID"
  },
  {
    "columnName": "id",
    "order": 1,
    "locked": false,
    "visible": false,
    "displayName": "ID"
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
    "columnName": "sla",
    "order": 4,
    "locked": false,
    "visible": true,
    "displayName": "SLA"
  },
  {
    "columnName": "daysOpen",
    "order": 5,
    "locked": false,
    "visible": true,
    "displayName": "Days Open"
  },
  {
    "columnName": "dateCreated",
    "order": 5,
    "locked": false,
    "visible": false,
    "displayName": "Date Created"
  },
  {
    "columnName": "currentStatus",
    "order": 6,
    "locked": false,
    "visible": true,
    "displayName": "Status"
  },
  {
    "columnName": "dateCreated",
    "order": 1,
    "locked": false,
    "visible": true,
    "displayName": "Date Created"
  },
  {
    "columnName": "assigned",
    "order": 1,
    "locked": false,
    "visible": true,
    "displayName": "Assigned"
  },
  {
    "columnName": "dateVerified",
    "order": 1,
    "locked": false,
    "visible": true,
    "displayName": "Date Verified"
  },
  {
    "columnName": "userIdClosed",
    "order": 1,
    "locked": false,
    "visible": false,
    "displayName": "User Id Closed"
  },
  {
    "columnName": "watchItem",
    "order": 1,
    "locked": false,
    "visible": true,
    "displayName": "Watch"
  },
  {
    "columnName": "checkNumber",
    "order": 1,
    "locked": false,
    "visible": false,
    "displayName": "Check Number"
  },
  {
    "columnName": "locked",
    "order": 1,
    "locked": false,
    "visible": false,
    "displayName": "locked"
  },
  {
    "columnName": "benAccountNumber",
    "order": 1,
    "locked": false,
    "visible": true,
    "displayName": "Account Number"
  },
  {
    "columnName": "otherBenefitsComments",
    "order": 1,
    "locked": false,
    "visible": false,
    "displayName": "Benefits Comments"
  },
  {
    "columnName": "mailedTo",
    "order": 1,
    "locked": false,
    "visible": false,
    "displayName": "Mailed to"
  },
  {
    "columnName": "userIdVerified",
    "order": 1,
    "locked": false,
    "visible": false,
    "displayName": "User Id Verified"
  },
  {
    "columnName": "reviewDeadline",
    "order": 1,
    "locked": false,
    "visible": true,
    "displayName": "Review Deadline"
  },
  {
    "columnName": "userIdAssigned",
    "order": 1,
    "locked": false,
    "visible": false,
    "displayName": "User Id Assigned"
  },
  {
    "columnName": "benSocialNumber",
    "order": 1,
    "locked": false,
    "visible": true,
    "displayName": "SSN"
  },
  {
    "columnName": "numberPayments",
    "order": 1,
    "locked": false,
    "visible": false,
    "displayName": "Number of Payments"
  },
  {
    "columnName": "fullRecovery",
    "order": 1,
    "locked": false,
    "visible": false,
    "displayName": "Full Recovery"
  },
  {
    "columnName": "glCostCenter",
    "order": 1,
    "locked": false,
    "visible": false,
    "displayName": "Cost Center"

  },
  {
    "columnName": "userIdOpened",
    "order": 1,
    "locked": false,
    "visible": false,
    "displayName": "User ID Opened"
  },
  {
    "columnName": "mainType",
    "order": 1,
    "locked": false,
    "visible": true,
    "displayName": "Case Type"
  },
  {
    "columnName": "benCustomerId",
    "order": 1,
    "locked": false,
    "visible": true,
    "displayName": "Beneficiary ID"
  },
  {
    "columnName": "claimNumber",
    "order": 1,
    "locked": false,
    "visible": true,
    "displayName": "Claim Number"
  },
  {
    "columnName": "completedDate",
    "order": 1,
    "locked": false,
    "visible": true,
    "displayName": "Date Completed"
  },
  {
    "columnName": "ddaAccountNumber",
    "order": 1,
    "locked": false,
    "visible": false,
    "displayName": "DDA Account Number"
  },
  {
    "columnName": "dateClosed",
    "order": 1,
    "locked": false,
    "visible": false,
    "displayName": "Date Closed"
  },
  {
    "columnName": "subType",
    "order": 1,
    "locked": false,
    "visible": true,
    "displayName": "Sub Type"
  },
  {
    "columnName": "dateOfDeath",
    "order": 1,
    "locked": false,
    "visible": false,
    "displayName": "Date of Death"
  },
  {
    "columnName": "recoveryMethod",
    "order": 1,
    "locked": false,
    "visible": true,
    "displayName": "Recovery Method"
  },
  {
    "columnName": "additionalNotes",
    "order": 1,
    "locked": false,
    "visible": false,
    "displayName": "Additional Notes"
  },
  {
    "columnName": "otherRecoveryComments",
    "order": 1,
    "locked": false,
    "visible": false,
    "displayName": "Recovery Comments"
  },
  {
    "columnName": "otherGovBenefits",
    "order": 1,
    "locked": false,
    "visible": false,
    "displayName": "Other Gov Benefits"
  },
];




module.exports = HomePage;
