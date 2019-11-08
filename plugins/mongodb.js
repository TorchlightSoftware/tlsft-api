'use strict'

module.exports = async function routes(fastify, options) {
  return fastify.register(
    require('fastify-mongoose'), {
      uri: process.env.MONGO_URI
    })
}
