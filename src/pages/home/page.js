import React from "react";
import Griddle from 'griddle-react';
import styles from "./style.css";
import restCalls from '../../utils/restCalls';
import { browserHistory } from 'react-router';
import CaseModal from '../../common/components/CaseModal';
import ViewCaseModal from '../../common/components/ViewCaseModal';
import {Nav, NavDropdown,Navbar, NavItem, MenuItem} from 'react-bootstrap';



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
    console.log('logging out');
    window.localStorage.removeItem('user');
    console.log('logging out');
    browserHistory.push('/');
  },

  openGovRecModal: function () {
    this.refs.govRecCaseModal.open();
    setTimeout(function(){
        console.log('logging refs for homePageComponent', this.refs.govRecCaseModal.refs.tm.logMarmots());
    }.bind(this), 150);

  },
  //wrapping caseData attributes in H3 html element
  parseCaseData(theCase){
    return Object.keys(theCase).map( (theKey, idx) => <h3 key={idx} > {theCase[theKey]} </h3>);

  },

  rowClick: function (e) {
    console.log('props', e.props.data.benName);
    this.setState({currentCaseData: this.parseCaseData(e.props.data)});
    this.refs.viewCaseModal.open();

    console.log('logging refs afteropeing', this.refs.govRecCaseModal.refs.tm);
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
            <Nav pullRight>
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
          columns={["id", "benName", "totalAmount", "SLA", 'Number of Days Open', 'Status']}
          noDataMessage={"No Cases to Display. Try Refreshing the page or click Add New above."}
          onRowClick={this.rowClick}
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
