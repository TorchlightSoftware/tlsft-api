'use strict'

module.exports = async function routes(fastify, options) {

  // Declare a route
  fastify.get('/todos', async () => {
    const {Todo} = fastify.mongo.db.models
    return Todo.find()
  })

  fastify.post('/todos', async (req, reply) => {
    // save to MongoDB
    const {Todo} = fastify.mongo.db.models
    await Todo.create(req.body)
    reply.code(201).send()
  })

}

