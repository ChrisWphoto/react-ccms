import React from "react";
import Griddle from 'griddle-react';
import styles from "./style.css";
import helpers from '../../utils/helpers';

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






        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">CCMS</a>
            </div>


            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active"><a href="#">My Dashboard <span className="sr-only">(current)</span></a></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Separated link</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">One more separated link</a></li>
                  </ul>
                </li>
              </ul>
              <form className="navbar-form navbar-left" role="search">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search"></input>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Link</a></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Separated link</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>













        <h1>Cases for {this.state.userInfo.firstName} {this.state.userInfo.LastName}</h1>
        <Griddle results={this.state.cases} tableClassName="table" showFilter={true}
          showSettings={true} columns={["id", "dateCreated", "currentStatus", "mainType", 'subType']}
          noDataMessage={"No Cases to Display. Try Refreshing the page or click Add New above."}/>

      </div>
    );
  }
})

module.exports = HomePage;
