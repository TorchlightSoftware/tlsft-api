'use strict'

module.exports = async function routes(fastify, options) {

  // Declare a route
  fastify.get('/', async () => {
    return {hello: 'world'}
  })
}
