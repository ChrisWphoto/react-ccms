import React from 'react';
import { browserHistory } from 'react-router';
import styles from './style.css';
import Login from '../../common/components/Login';

var LoginPage = React.createClass( {



  render() {
    return (
      <div className={styles.content}>
        <h1 className={styles.heading}>CCMS </h1>

        <Login />
        <p className={styles.lead}>Don't have an account? </p>
        <button type="button" onClick={this.signUp}>Sign up</button>
      </div>
    );
  }
})

module.exports = LoginPage;
