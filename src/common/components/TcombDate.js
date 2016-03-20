import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import t from 'tcomb-form';
const Form = t.form.Form;

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
  getTemplate() {
    return datePickerTemplate;
  }
}

t.Date.getTcombFormFactory = () => DatePickerFactory;

module.exports = renderDate;
