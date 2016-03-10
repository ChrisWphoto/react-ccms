import React from 'react';
import { browserHistory } from 'react-router';
import styles from './style.css';
import Login from '../../common/components/Login';

var LoginPage = React.createClass( {
  componentDidMount: function() {
    console.log('inside mounting');
    let userInfo = JSON.parse(window.localStorage.getItem('user'));
    if  (userInfo){
      console.log('pushing to /home');
      browserHistory.push('/home');
    }
  },


  render() {
    return (
      <div className={styles.content}>
        <h1 className={styles.heading}>CCMS </h1>

        //This is loading the Login in component which is imported above
        <Login />

        <p className={styles.lead}>Don't have an account? </p>
        <button type="button" onClick={this.signUp}>Sign up</button>
      </div>
    );
  }
})

module.exports = LoginPage;
