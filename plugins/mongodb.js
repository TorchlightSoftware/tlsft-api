'use strict'

const {basename} = require('path')
const mongoose = require('mongoose')

module.exports = async function routes(fastify) {
  fastify
    .register(require('fastify-mongoose-driver').plugin, {
      uri: process.env.MONGO_URI,
      settings: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        config: {
          autoIndex: true,
        }
      },
    })
    .after((err) => {
      // just blow up if mongoose failed to load
      if (err) throw err

      // load all our schemas
      fastify.forEachFileUnder('schemas', (filename) => {
        const db = fastify.mongoose.instance
        fastify.decorate('db', db)
        const schemaName = basename(filename, '.js')
        db.model(schemaName, new mongoose.Schema(require(filename)))
      })
    })
}
