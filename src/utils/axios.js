const axios = require('axios')

function getRowBlockInfo(blockHash, callback) {
  const baseUrl = 'https://blockchain.info/rawblock'
  const requestUrl = `${baseUrl}/${blockHash}`
  axios.get(requestUrl)
    .then(response => {
        callback(null, response)
    })
    .catch(error => {
        if (error.response) {
            console.log("error status", error.response.status)
        }
        console.log(error)
        callback(error, null)
    })
    .then(() => {
        // always executed
    })
}

module.exports = {
    getRowBlockInfo
}
