import axios from 'axios';

var startTime;

function getCases(){
  startTime = Date.now();
  console.log('inside of cases', startTime);
  let findCases = "https://ccmsrestapi.herokuapp.com/findallcases"
  console.log(findCases);
  return axios.get(findCases);
};


//extend this function later with axios.all([/*array of http function calls*/])
var helpers = {
  getDashboardInfo: function(){
    return getCases().then(function(cases){
      console.log('Time delta',Date.now()-startTime);
      console.log('in helpers', cases);
      return cases.data;
    })
  }
}

module.exports = helpers;
