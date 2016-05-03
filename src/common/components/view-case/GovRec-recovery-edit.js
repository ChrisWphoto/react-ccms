import React from 'react';
import t from 'tcomb-form';
import DatePicker from 'react-bootstrap-date-picker';

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
