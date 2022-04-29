'use strict'

module.exports = async function routes(fastify, options) {
  // List locations
  fastify.get('/locations', async () => {
    const {Location} = fastify.roachmodels
    return Location.findAll()
  })

  // Create a location
  fastify.post('/locations', async (req, reply) => {
    const {Location} = fastify.roachmodels
    const createdLocation = await Location.create(req.body)
    reply.code(201).send(createdLocation)
  })

  // Get a location by id
  fastify.get('/locations/:id', async (req, reply) => {
    const {id} = req.params
    const {Location} = fastify.roachmodels
    return Location.findOne({where: {id}})
  })

  // Update a location by id
  fastify.patch('/locations/:id', async (req, reply) => {
    const {Location} = fastify.roachmodels
    return Location.update(req.body, {where: req.params})
  })

  // Get a single location

  // Update a location

  // Delete a location
}
