const axios = require('axios')

function getRowBlockInfo(blockHash, callback) {
  const baseUrl = 'https://blockchain.info/rawblock'
  const requestUrl = `${baseUrl}/${blockHash}`
  axios.get(requestUrl)
    .then(function (response) {
        console.log(response)
        callback(response)
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    })
}

module.exports = {
    getRowBlockInfo
}
