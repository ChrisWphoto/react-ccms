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

        {/* Login is the login commponet declared above*/}
        <Login />

        <p className={styles.lead}>Need an account? </p>
        <button type="button" onClick={this.signUp}>Sign up</button>
      </div>
    );
  }
})

module.exports = LoginPage;
