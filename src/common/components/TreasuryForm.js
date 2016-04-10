//not formatted for the backend


import React from 'react';
import { render } from 'react-dom';
import t from 'tcomb-form';

const Form = t.form.Form;

// define your domain model with tcomb
// https://github.com/gcanti/tcomb

//const test= t.struct({tee:t.maybe(t.Number)});


const Type = t.enums({
  A: 'Treasury Referral',
  B: 'Treasury Reclamation'});

var Recover = t.enums.of('Commerce_Bank Customer_DDA Other');
var options = {
  fields: {
    rec: {
      options: [
        {label: 'Commerce_Bank', options: [ // a group of options
          {value: 'GLC', text: 'GLC & Cost Center'}
        ]}, // an option

        {label: 'Customer_DDA', options: [ // a group of options
          {value: 'NUM', text: 'Account Number'}
        ]},

        {label: 'Other', options: [ // another group of options
          {value: 'OTH', text: 'Comment'}
        ]} // use `disabled: true` to disable an optgroup
      ]
    }
  }
};

const Method = t.enums({
  A: 'Commerce Bank',
  B: 'Customer DDA',
  C: 'Other'
});
const Textbox = t.struct({
  Comments: t.String
});
const Payment = t.struct({
  Date_Effective: t.maybe(t.Date),
  Payment_Amount: t.maybe(t.Number),

});
const Treasury = t.struct({
  Form_Type:Type,
  Name: t.maybe(t.String),
  Account: t.maybe(t.String),
  SSN: t.maybe(t.String),
  Claim_Number:t.maybe(t.Number),
  Number_of_Payments: t.maybe(t.Number),
  Payment_Method:t.list(Payment),
  //Recovery_Method: t.maybe(Method),
  Recovery_Method: Recover,
  Total_Amount:t.maybe(t.Number),
  Completion_Date:t.maybe(t.Date),
  Additional_Notes:t.maybe(Textbox),

});

const App = React.createClass({

  onSubmit(evt) {
    const value = this.refs.form.getValue();
    if (!value) {
      // there are errors, don't send the form
      evt.preventDefault();
    } else {
      // everything ok, let the form fly...
      // ...or handle the values contained in the
      // `value` variable with js
    }
  },
  render() {
    return (
        <form onSubmit={this.onSubmit}>
          <Form
              ref="form"
              type={Treasury}
              options={options}
          />
          <button type="submit">Submit</button>
        </form>
    );
  }

});


const dateTransformer = {
 format: (value) => t.Date.is(value) ? value.toISOString() : value,
 parse: (str) => str ? new Date(str) : null
 };

 const renderDate = (locals) => {
 return (
 <DatePicker value={locals.value} onChange={locals.onChange}/>
 );
 }

 const datePickerTemplate = Form.templates.date.clone({ renderDate });

 class DatePickerFactory extends t.form.Component {
 static transformer = dateTransformer // <= yep!
 getTemplate() {
 return datePickerTemplate
 }
 }

 t.Date.getTcombFormFactory = () => DatePickerFactory;



 module.exports = Tform;
