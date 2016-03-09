import React from "react";
import Griddle from 'griddle-react';
import styles from "./style.css";
import helpers from '../../utils/helpers';
var fakeData =  [
  {
    "id": 0,
    "name": "Mayer Leonard",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
    "favoriteNumber": 7
  },
  {
    "id": 1,
    "name": "Chris Leonard",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
    "favoriteNumber": 9
  },
  {
    "id": 2,
    "name": "Tanner",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
    "favoriteNumber": 11
  },
  {
    "id": 10,
    "name": "Mayer Leonard",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
    "favoriteNumber": 7
  },
  {
    "id": 11,
    "name": "Chris Leonard",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
    "favoriteNumber": 9
  },
  {
    "id": 22,
    "name": "Tanner",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
    "favoriteNumber": 11
  }


];

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
  },


  render() {
    return (
      <div className={styles.content}>
        <h1>Cases for {this.state.userInfo.firstName} {this.state.userInfo.LastName}</h1>
        <Griddle results={this.state.cases} tableClassName="table" showFilter={true}
          showSettings={true} columns={["id", "dateCreated", "currentStatus", "mainType", 'subType']} />

      </div>
    );
  }
})

module.exports = HomePage;
