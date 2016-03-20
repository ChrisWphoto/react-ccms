import React from "react";
import Griddle from 'griddle-react';
import styles from "./style.css";
import helpers from '../../utils/helpers';
import { browserHistory } from 'react-router';
import CaseModal from '../../common/components/CaseModal';
import Tform from '../../common/components/Tcomb';
import {Nav, NavDropdown,Navbar, NavItem, MenuItem} from 'react-bootstrap';





var HomePage = React.createClass ({

  getInitialState: function(){
     return {
       userInfo: JSON.parse(window.localStorage.getItem('user'))
     }
  },

  componentDidMount: function() {
    helpers.getDashboardInfo()
      .then(function(allCases){
        this.setState({cases: allCases});
        // console.log(allCases);
    }.bind(this))
    console.log(this.refs);
  },

  logOut: function(){
    console.log('logging out');
    window.localStorage.removeItem('user');
    console.log('logging out');
    browserHistory.push('/');
  },

  openGovRecModal: function () {
    this.refs.govRecCaseModal.open();
  },

  rowClick: function (e) {
    console.log('props', e.props);
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
        <h1 >Cases for {this.state.userInfo.firstName} {this.state.userInfo.LastName}</h1>
        <br/>


        <Griddle
          results={this.state.cases}
          tableClassName="table" showFilter={true}
          showSettings={true}
          columns={["id", "benName", "totalAmount", "SLA", 'Number of Days Open', 'Status']}
          noDataMessage={"No Cases to Display. Try Refreshing the page or click Add New above."}
          onRowClick={this.rowClick}
        />
      

        <CaseModal ref={'govRecCaseModal'} />

      </div>
    );
  }
})

module.exports = HomePage;
