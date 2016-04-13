import axios from 'axios';

var startTime;

function getCases(){
  startTime = Date.now();
  console.log('inside of cases', startTime);
  let findCases = "http://testccmsrestapi.herokuapp.com/findallcases"
  console.log(findCases);
  return axios.get( findCases );
};



//extend this function later with axios.all([/*array of http function calls*/])
// TODO: Add .catch() to these to deal with errors
var restCalls = {
  getDashboardInfo: function(){
    return getCases().then(function(cases){
      console.log('Time delta',Date.now()-startTime);
      console.log('in restCalls', cases);
      return cases.data;
    })
  },

  creatCase: function(caseJSON){
    let creatCaseURI = 'https://ccmsrestapi.herokuapp.com/createcase';
    return axios.post( creatCaseURI, caseJSON ).then(caseResponse => {
      console.log(caseResponse);
    })
  },

  sendNacha: function(file){
    let uri = 'http://testccmsrestapi.herokuapp.com/importnachafile';
    return axios.post( uri, file ).then(newCases => newCases);
  }
}

module.exports = restCalls;
