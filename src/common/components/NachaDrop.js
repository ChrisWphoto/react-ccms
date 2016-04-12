var React = require('react');
var Dropzone = require('react-dropzone');
import axios from 'axios';
import rest from '../../utils/restCalls';
import NachaModal from './NachaModal';





var NachaDrop = React.createClass({
    getInitialState: function() {
      return {
        files: false,
        loader: false,
        nachaSuccess: false
      };
    },

    postNacha: function (b64text) {
      let nfile = {userId: 1, encodedString: b64text}
      console.log("b64text", b64text.substr(0,5));
      //send text to server
      rest.sendNacha(nfile).then(res => {
        window.nacha = res;
        console.log('returned data', res);
        this.setState({
          loader:false,
          nachaSuccess: res.data.length + " cases added"
        });
        //wait 10.5sec then take down success message
        setTimeout( () => this.setState({nachaSuccess: false}), 10500)
      });
    },

    handleFileSelect: function(files, postNachaCB) {
      console.log(files[0]);
      var file = files[0];
      let b64text;

      if (files) {
          var reader = new FileReader();
          reader.onload = function(readerEvt) {
              var binaryString = readerEvt.target.result;
              b64text = btoa(binaryString);
              //pass data to callback
              postNachaCB(b64text);
          };
          //read text from file
          reader.readAsBinaryString(file);
      }
    },

    onDrop: function (files) {
      console.log('Received files: ', files);
      this.handleFileSelect(files, this.postNacha);
      this.setState({
        files: files,
        loader: true,
        filePreview: files.map(
          file => ( <div key={file.name}>
                      <span style={uploadingAnimation} key={file.name + '2'}>
                        Uploading:
                      </span>
                      <span style={font} key={file.name +'3'}>
                        {file.name}
                      </span>
                    </div>
                  )
        )
      });
    },

    render: function () {
      return (
          <div style={{float:'right'}} >
            <Dropzone  onDrop={this.onDrop} style={styleDrop}
              activeStyle={activeStyleDrop} rejectStyle={rejectStyleDrop} >
              <div>NACHA Drop</div>
            </Dropzone>
            <br/>
            {/* Uploading: Display file name while */}
            {this.state.files && this.state.loader ? <div >
            <div> {this.state.filePreview} </div>
            </div> : null}
            {/*Success: Show number of cases added*/}
            {this.state.nachaSuccess ? <div >
            <div style={font}> <br/>Success: {this.state.nachaSuccess} </div>
            </div> : null}
          </div>
      );
    }
});

//style for nacha drop box
const styleDrop = {
 width: 215,
 height: '45px',
 float: 'right',
 borderWidth: 2,
 borderColor: '#666',
 borderStyle: 'dashed',
 fontSize: 27,
 textAlign: 'center',
 borderRadius: 5
};
const activeStyleDrop = {
 borderStyle: 'solid',
 backgroundColor: '#eee'
};
const rejectStyleDrop = {
 borderStyle: 'solid',
 backgroundColor: '#ffdddd'
};

//style for uploading animation'
const uploadingAnimation = {
  color: '#F97F85',
  fontSize: 18,
  animation: 'fade-in-out 1.5s infinite linear'
};

const font = {
  fontSize: 18
};


module.exports = NachaDrop;
