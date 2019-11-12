const _ = require('lodash')

const apiClient = require('axios').create({
  baseURL: `http://localhost:${process.env.PORT}`
})

apiClient.interceptors.response.use(
  // default success interceptor
  response => response,

  // pull out nested messages so we actually get some useful output when requests fail
  function(error) {
    const nestedMessage = _.get(error, 'response.data.message')
    if (nestedMessage) {
      error.message = error.message + ': ' + nestedMessage
    }
    return Promise.reject(error)
  }
)

module.exports = apiClient
