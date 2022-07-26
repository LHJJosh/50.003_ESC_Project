const throttleQueue = require('throttled-queue');
const axios = require('axios');

const DEST_JSON = require('./destinations.json');
const searchCache = []

let throttle = throttleQueue(3, 100);

function f() {
  DEST_JSON.forEach(async (jsonValue) => {
    throttle(function() {
      jsonValue['lat'] = jsonValue['lat'].toFixed(6)
      jsonValue['lng'] = jsonValue['lng'].toFixed(6)
      searchCache.push({
        label: jsonValue['term'],
        value: jsonValue // lat lng state term type uid
      })
      axios.post('http://localhost:8000/api/destinations/', jsonValue)
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error)
      });
    });
  });
}

f();