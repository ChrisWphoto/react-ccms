import axios from 'axios';


function getCases(){
  console.log('inside of cases');
  return axios.get('http://ccmsrestapi.herokuapp.com/findallcases');
};


//extend this function later with axios.all([/*array of http function calls*/])
var helpers = {
  getDashboardInfo: function(){
    return getCases().then(function(cases){
      console.log('in helpers', cases);
      return cases.data;
    })
  }
}

module.exports = helpers;
