import React from 'react';
import {Button, ListGroupItem, ListGroup} from 'react-bootstrap';
import Axios from 'axios';


var AssignUser  = React.createClass({
  getInitialState: function() {
    return {
      allUsers: ["Fetching name from DB..."],
      assigningUser: ""
    };
  },

  componentDidMount: function() {
    Axios.get("http://testccmsrestapi.herokuapp.com/findallusers")
      .then(function({data}) {
      // console.log("All Users:", data );
      let listUsers = data.map( user => <ListGroupItem onClick={this.assign.bind(this, user)} href="#" key={user.id}>
         {user.firstName} {user.lastName} </ListGroupItem>
       );
      this.setState({allUsers: listUsers });
    }.bind(this));
  },


  assign: function(user) {
    this.setState({assigningUser: "Saving user to DB..."});
    Axios.get("http://testccmsrestapi.herokuapp.com/assigncase", {
      params: {
        userId: user.id,
        caseId: this.props.caseId,
        assign: true
      }
    }).then(function({data}){
      console.log("data from assign",data);
      this.setState({assigningUser: "Case has been assigned"});
      this.props.updateAssignedUser((user.firstName + " " + user.lastName));
    }.bind(this));

  },

  render: function() {
    return (
        <div style={{padding:10, marginBottom: 15}}>
            { this.props.active ? <div>
              <h3> Choose an Assignee </h3> <span> {this.state.assigningUser} </span>
              <ListGroup> {this.state.allUsers} </ListGroup> </div> : null}
        </div>
    );
  }

});

module.exports = AssignUser;
