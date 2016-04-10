var React = require('react');
var Dropzone = require('react-dropzone');
var req = require('superagent');

var DropzoneDemo = React.createClass({
    getInitialState: function () {
        return {
            files: []
        };
    },

    onDrop: function (files) {
      var request = req.post('/upload');
        files.forEach((file)=> {
            request.attach(file.name, file);
            console.log(file.name)
            console.log("nsyde")
            console.log(file)
        });
        request.end(function(err, res){

        });
    },



    onOpenClick: function () {
        this.refs.dropzone.open();
    },

    render: function () {
        return (
            <div>
                <Dropzone ref="dropzone" onDrop={this.onDrop}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
                {this.state.files.length > 0 ? <div>
                    <h2>Uploading {this.state.files.length} files...</h2>
                </div> : null}
            </div>
        );
    }
});

React.render(<DropzoneDemo />, document.body);