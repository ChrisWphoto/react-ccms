import React from 'react';
import { browserHistory } from 'react-router';
import styles from './style.css';


var LoginPage = React.createClass( {
  getInitialState: function(){
    return{
      user:'chris'
    }
  },

  signUp: function() {
    browserHistory.push('/home');
  },

  onChange: function(e) {
    let state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  },

  selectUserType: function(userType) {
    let state = {};
    state.userType= userType;
    this.setState(state);
  },

  submitForm: function() {
    console.log(this.state);
    window.localStorage.setItem('user', JSON.stringify(this.state));
    browserHistory.push('/home');
  },


  render() {
    return (
      <div className={styles.content}>
        <h1 className={styles.heading}>CCMS Login </h1>
        <p className={styles.lead}>Don't have an account? </p>
        <button className={styles.signUpButton} onClick={this.signUp}>Sign up</button>
        <div className='loginWrapper' style={{textAlign:'center'}}>
        <form className="form-signin">
           <h2 className="form-signin-heading">Please login</h2>

           <input type="text" className="form-control" name="firstName"
             placeholder="First Name" onChange={this.onChange} required="true" autofocus="" />
           <input type="text" className="form-control" name="LastName"
             placeholder="Last Name" onChange={this.onChange} required="true"/>

         <br/>
           <h2> Select User Type </h2>
           <div className="btn-group" style={{margin: '25px auto'}} role="group" aria-label="...">
              <button type="button" name="caseMngr" onClick={this.selectUserType.bind(this, 'Case Manager')} className="btn btn-default"> <span className="glyphicon glyphicon-briefcase" aria-hidden="true"></span> Case Manager</button>
              <button type="button" name='admin' onClick={this.selectUserType.bind(this, 'Admin')} className="btn btn-default"><span className="glyphicon glyphicon-globe" aria-hidden="true"></span> Admin</button>
           </div>
           <br/><br/>
           <button className={styles.signUpButton} onClick={this.submitForm}>Login</button>
         </form>
        </div>
      </div>
    );
  }
})

module.exports = LoginPage;
