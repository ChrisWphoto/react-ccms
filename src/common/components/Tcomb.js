import React from 'react';
import { render } from 'react-dom';
import t from 'tcomb-form';
import DatePicker from 'react-bootstrap-date-picker';
import axios from 'axios';
const Form = t.form.Form;



// define your domain model with tcomb
// https://github.com/gcanti/tcomb
const Person = t.struct({
  beneficiaryName: t.String,
  beneficiarySSN: t.Number,
  verifiedDated: t.Date // a date field

});

const Tform = React.createClass({

  save2() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();

    // if validation fails, value will be null
    if (value) {
      // value here is an instance of Person
      console.log(value);
      console.log(value.BeneficiarySSN);
      axios.post('http://ccmsrestapi.herokuapp.com/createcase', {
        benName: value.beneficiaryName,
        benSocialNumber: value.BeneficiarySSN,
        id: 1
      })
      .then(function (response) {
        console.log('success');
        console.log(response);
      })
      .catch(function (response) {
        console.log('Failure Promise resolved...');
        console.log(response);
      });
    }
    else console.log("no value", value);
  },

  render() {
    return (
      <div>
        <Form
          ref="form"
          type={Person}
        />
      <button onClick={this.save2}>Save</button>
      </div>
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
