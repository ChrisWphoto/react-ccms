import React from 'react';
import t from 'tcomb-form';
import DatePicker from 'react-bootstrap-date-picker';
import {Button} from 'react-bootstrap';
import restCalls from '../../../utils/restCalls';


const Form = t.form.Form;
console.log(t.form.Form.templates);

const payment = t.struct({
  amount: t.Number,
  date: t.Date
});

const method = t.enums({
  ach: "ACH Return",
  chk: 'Cashier Check Mailed',
  mix: 'Mixed Method',
});


const editRecoverForm = t.struct({
  method: method,
  payments: t.list(payment),
  fullRecovery: t.maybe(t.Boolean),
  completedDate:t.maybe(t.Date),
  notes:t.maybe(t.String),
  verifiedBy:t.String,
  verifiedDate:t.Date
});



//options for form
const options = {
  fields: {
    payments: {
      label: <span style={{color: 'grey'}}> Edit Recorded Payment(s)   </span>
    },
    method: {
      label: "Recovery Method"
    },
    fullRecovery: {
      label: <span style={{fontSize: 18}}> Full Recovery Completed   </span>
    }
  }
}


var EditGovRec  = React.createClass({

    getInitialState: function(){
        return {
            userInfo: JSON.parse(window.localStorage.getItem('user')),
            formValue: {
                amountPaid: '$0',
                fullRecovery: 'false',
                notes: 'default note',
                completedDate: "01/01/1111",
                payments: [{caseId:"defaultVal"}],
                verifiedBy: "Type a user's name"
            }
        }
    },

  componentWillReceiveProps: function(nextProps) {
  this.setState({
    formValue: {
        amountPaid: nextProps.theCase.totalAmount,
        fullRecovery: nextProps.theCase.fullRecovery,
        notes: nextProps.theCase.additionalNotes || "No Notes Added Yet",
        completedDate: nextProps.theCase.dateCreated,
        payments: nextProps.payments,
        verifiedDate: nextProps.theCase.dateVerified
    }

  });
},

//this is where the data captured in the form is prepared for the backend
parseCaseOj(form){
  //Convery Dates for Payments
  let payments = [];
  form.payments.forEach( pay => {
    payments.push({
      date: pay.date.toISOString(),
      amount: pay.amount
    });
  });

  return {
    userId: this.state.userInfo.userId,
    governmentReclamation: {
      recoveryMethod: form.method,
      fullRecovery: form.fullRecovery,
      completedDate: form.completedDate.toISOString(),
      dateVerified: form.verifiedDate.toISOString(),
      userIdVerified: this.state.userInfo.userId
    },
    paymentsToModify: payments
  }
},

saveEditForm() {
  // call getValue() to get the values of the form
  var value = this.refs.govRecEdit.getValue();
  // if validation fails, value will be null
  if (value){
    console.log(value);
    console.log( this.parseCaseOj(value) );
    restCalls.updateCase(this.parseCaseOj(value)).then((val) => {console.log(val); this.props.closeModal()})
    //refresh cases on Dashboard
    window.setTimeout( () => this.props.refreshCases(), 550 );
  }
  else console.log("Form is invalid or an error occured: form value is", value);
},


  render: function() {
    return (
        <div style={{border:"2px dashed", padding: 10}}>
          <h2>Recovery Details <span style={{color:"#F97F85"}}> Edit Mode </span></h2>
          <div style={{marginTop: 25}}>
            <Form ref="govRecEdit"
            type={editRecoverForm}
            value={this.state.formValue}
            options={options}
            />
          </div>
          <Button onClick={this.saveEditForm}> Save Updates</Button>
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


module.exports = EditGovRec;
