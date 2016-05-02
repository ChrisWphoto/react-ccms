import React from 'react';
import { render } from 'react-dom';
import t from 'tcomb-form';
import DatePicker from 'react-bootstrap-date-picker';
import restCalls from '../../utils/restCalls';
import {Button} from 'react-bootstrap';

const Form = t.form.Form;



const method = t.enums({
  ach: "ACH Return",
  chk: 'Cashier Check Mailed',
  mix: 'Mixed Method',

});



var options = {
  auto: 'placeholders',
};


function getType(value){

var CaseStatus = {
  method: method,
  fullRecovery: t.Boolean,
  dateComplete: t.maybe(t.Date),
  notes:t.String,
  VerifiedBy:t.String,
  VerifiedDate:t.Date,
};
  if(value.method=="chk")
  {
    CaseStatus.CheckNumber=t.Number;
    CaseStatus.MailedTo=t.String;
  }
  return t.struct(CaseStatus);
}



var Tform = React.createClass({


  getInitialState: function () {
    return {
      type: getType({}),
      value: {}
    };
  },

  onChange: function (value) {
    this.setState({
      type: getType(value),
      value: value
    });
  },

  save: function () {
    var value = this.refs.form.getValue();
    if (value) {
      console.log(value);
    }
  },

  //this is where the data captured in the form is prepared for the backend
  parseCaseOj(form){



    return {
      userId: 1,
      governmentReclamation: {
        recoveryMethod:form.method,
        fullRecovery: form.fullRecovery,
        completedDate: form.dateComplete.toISOString(),
        dateVerified: form.VerifiedDate.toISOString(),
      }
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
      restCalls.updateCase(this.parseCaseOj(value)).then((val) => this.props.closeModal())
      //refresh cases on Dashboard
      window.setTimeout( () => this.props.refreshCases(), 550 );
    }
    else console.log("Form is invalid or an error occured: form value is", value);
  },

  render() {
    return (
      <div>
        <Form
          ref="form"
          options={options}
          type={this.state.type}
          value={this.state.value}
          onChange={this.onChange}
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



module.exports = Tform;
