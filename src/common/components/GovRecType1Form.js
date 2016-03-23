import React from 'react';
import { render } from 'react-dom';
import t from 'tcomb-form';
import DatePicker from 'react-bootstrap-date-picker';
import restCalls from '../../utils/restCalls';


const Form = t.form.Form;

//defining enum for person form
const govRecSubType = t.enums({
  govrec: 'Government Reclamation',
  crf: 'CRF',
  dcn: 'DCN',
  dne: 'DNE'
});

// define your domain model with tcomb
// https://github.com/gcanti/tcomb
const GovRecCaseCreationForm = t.struct({
  selectCaseSubtype: govRecSubType,
  beneficiaryName: t.String,
  // beneficiarySSN: t.Number,
  // beneficiaryAccountNumber: t.Number,
  // beneficiaryCustomerID: t.Number,
  dateOfDeath: t.Date,
  // dateLearnedOfDeath: t.Date,
  // otherGovernmentBenefits: t.Boolean,
  // ifYesAboveAddComment: t.String,
  // paymentAmount: t.Number,
  // paymentDate: t.Date,
  sumOfPayments: t.Number,
  // claimNumber: t.Number
});

var Tform = React.createClass({

  logMarmots(){
    console.log("MARMOTAAAAAAA MOTHER FUCKERS@@@@@@@@");
  },
  parseCaseOj(form){
    return {
      userId: 1,
      caseEntity: {
        dateCreated: form.dateOfDeath.toISOString(),
        mainType: "Government Reclamation",
        subType: form.selectCaseSubtype,
        benName: form.beneficiaryName,
        totalAmount: form.sumOfPayments
      }
    };

  },

  save2() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();

    // if validation fails, value will be null
    if (value){
      console.log(value);
      console.log( this.parseCaseOj(value) );

      restCalls.creatCase(this.parseCaseOj(value));


    }
    else console.log("Form is invalid or an error occured: form value is", value);
  },

  render() {
    return (
      <div>
        <Form
          ref="form"
          type={GovRecCaseCreationForm}
        />
      <button onClick={this.save2}>Save</button>
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
