'use strict'

module.exports = async function routes(fastify, options) {

  // List todos
  fastify.get('/todos', async () => {
    const {Todo} = fastify.mongo.db.models
    return Todo.find()
  })

  // Create a todo
  fastify.post('/todos', async (req, reply) => {
    // save to MongoDB
    const {Todo} = fastify.mongo.db.models
    let createdTodo = await Todo.create(req.body)
    reply.code(201).send(createdTodo)
  })

  // Get a single todo

  // Update a todo

  // Delete a todo
}

