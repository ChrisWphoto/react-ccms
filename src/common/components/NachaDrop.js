var React = require('react');
var Dropzone = require('react-dropzone');
import axios from 'axios';

 var styleDrop = {
  width: 215,
  height: '75px',
  float: 'right',
  borderWidth: 2,
  borderColor: '#666',
  borderStyle: 'dashed',
  fontSize: 27,
  textAlign: 'center',
  borderRadius: 5
};
var activeStyleDrop = {
  borderStyle: 'solid',
  backgroundColor: '#eee'
};
var rejectStyleDrop = {
  borderStyle: 'solid',
  backgroundColor: '#ffdddd'
};



var NachaDrop = React.createClass({
    getInitialState: function() {
      return {
        files: false
      };
    },

    onDrop: function (files) {
      console.log('Received files: ', files);
      this.setState({
        files: files,
        filePreview: files.map( file => <h4 id={file.name}>Uploading:{file.name}</h4> )
      });

    },

    render: function () {
      return (
          <div style={{float:'right'}} >
            <Dropzone  onDrop={this.onDrop} style={styleDrop} activeStyle={activeStyleDrop} rejectStyle={rejectStyleDrop} >
              <div>Click Here<br/>Drag+ File Here</div>
            </Dropzone>
            <br/>
            {this.state.files ? <div>
            <div> {this.state.filePreview} </div>
            </div> : null}
          </div>
      );
    }
});



module.exports = NachaDrop;
