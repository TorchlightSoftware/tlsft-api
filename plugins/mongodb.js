'use strict'

const {basename} = require('path')
const mongoose = require('mongoose')

module.exports = async function routes(fastify) {
  fastify
    .register(
      require('fastify-mongoose'), {
        uri: process.env.MONGO_URI
      })
    .after(err => {
      // just blow up if mongoose failed to load
      if (err) throw err

      // load all our schemas
      fastify.forEachFileUnder('schemas', filename => {
        const {db} = fastify.mongo
        const schemaName = basename(filename, '.js')
        db.model(schemaName, new mongoose.Schema(require(filename)))
      })
    })
}
