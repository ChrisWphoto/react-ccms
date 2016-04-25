import React from 'react';
import t from 'tcomb-form';
import DatePicker from 'react-bootstrap-date-picker';

const Form = t.form.Form;
console.log(t.form.Form.templates);

const testForm = t.struct({
  amountPaid: t.maybe(t.Number),  
  fullRecovery: t.maybe(t.Boolean),
  completedDate:t.maybe(t.Date),
  notes:t.maybe(t.String)
});



//options for form
const options = {
  fields: {
    notes: {
      
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
                completedDate: "01/01/1111"
            }     
        }
    },
  
  componentWillReceiveProps: function(nextProps) {
  this.setState({
    formValue: {
        amountPaid: nextProps.theCase.totalAmount,
        fullRecovery: nextProps.theCase.fullRecovery,
        notes: nextProps.theCase.additionalNotes || "No Notes Added Yet",
        completedDate: nextProps.theCase.dateCreated        
    } 
    
  });
},  
    
  
  render: function() {
    return (
        <div>
        <h2>Edit Recovery Details</h2>
        <div>
          <Form ref="govRecEdit"
          type={testForm}
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
