'use strict'

module.exports = async function routes(fastify, options) {

  // List todos
  fastify.get('/todos', async () => {
    const { Todo } = fastify.mongo.db.models
    return Todo.find()
  })

  // Create a todo
  fastify.post('/todos', async (req, reply) => {
    // save to MongoDB
<<<<<<< HEAD
    const { Todo } = fastify.mongo.db.models
=======
    const {Todo} = fastify.mongo.db.models
>>>>>>> 8a6f2b5cdce7ff1a8202e884ae28687c04cc9aa7
    let createdTodo = await Todo.create(req.body)
    reply.code(201).send(createdTodo)
  })

  fastify.get('/todos/:id', async () => {
    const { Todo } = fastify.mongo.db.models
    return Todo.findOne()
  })

  fastify.patch('/todos/:id', async (req, reply) => {
    const { Todo } = fastify.mongo.db.models
    return Todo.findOneAndUpdate({ assigned: 'Tommy' })
  })



  // Get a single todo

  // Update a todo

  // Delete a todo
}

