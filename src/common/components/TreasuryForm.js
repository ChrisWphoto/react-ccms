import React from 'react';
import { render } from 'react-dom';
import t from 'tcomb-form';
import DatePicker from 'react-bootstrap-date-picker';
import restCalls from '../../utils/restCalls';
import {Button} from 'react-bootstrap';


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


const Textbox = t.struct({
  Comments: t.String
});
const Payment = t.struct({
  date: t.Date,
  amount: t.Number

});
const Treasury = t.struct({
  Form_Type:Type,
  Name: t.String,
  Account: t.String,
  SSN: t.String,
  Claim_Number:t.Number,
  Number_of_Payments: t.Number,
  payment:t.list(Payment),
  Recovery_Method: Recover,
  Completion_Date:t.Date,
  Additional_Notes:t.maybe(Textbox),

});

var Yform = React.createClass({

  //this is where the data captured in the form is prepared for the backend
  parseCaseOj(form){

    //prepare payments
    let payments = [];
    var sumPayments = 0;
    form.payments.forEach( pay => {
      sumPayments += pay.amount;
      payments.push({
        date: pay.date.toISOString(),
        amount: pay.amount
      });
    });

    return {
      userId: 1,
      caseEntity: {
        dateCreated: form.Completion_Date.toISOString(),
        mainType: "Treasury Referral",
        subType: form.Form_Type,
        benName: form.Name,
        totalAmount: sumPayments,
        currentStatus: "Open"
      },
      paymentsToAdd: payments
    }

  },

  closeStuff() {
    console.log(this.props);
  },

  save2() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();

    // if validation fails, value will be null
    if (value){
      console.log(value);
      console.log( this.parseCaseOj(value) );
      restCalls.creatCase(this.parseCaseOj(value)).then((val) => this.props.closeModal())


    }
    else console.log("Form is invalid or an error occured: form value is", value);
  },

  render() {
    return (
      <div>
        <Form
          ref="form"
          type={Treasury}
        />
        <Button onClick={this.save2}>Save Case</Button>

      </div>
    );
  }

});


/*

 This is the code that makes the date picker work with tcomb
 a date object is returned that
 note that you also need to import DatePicker from 'react-bootstrap-date-picker'
 above

 */
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



module.exports = Yform;
