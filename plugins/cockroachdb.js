'use strict'

require('sequelize-cockroachdb')
const {basename} = require('path')

module.exports = async function routes(fastify) {
  const {ROACH_DB, ROACH_USER, ROACH_PASSWORD, ROACH_PORT, ROACH_HOST} = process.env
  fastify
    .register(require('sequelize-fastify'), {
      instance: 'roachdb',
      sequelizeOptions: {
        dialect: 'postgres',
        host: ROACH_HOST,
        port: ROACH_PORT,
        database: ROACH_DB,
        username: ROACH_USER,
        password: ROACH_PASSWORD,
        logging: false,
        typeValidation: true,
        dialectOptions: {cockroachdbTelemetryDisabled: true},
      },
    })
    .after(async () => {
      await fastify.roachdb.authenticate()

      const models = {}

      // load all our schemas
      await Promise.all(fastify.forEachFileUnder('schemas/roach', (filename) => {
        const {table, columns} = require(filename)
        const Model = fastify.roachdb.define(table, columns)

        // create a separate list of TitleCase models
        const schemaName = basename(filename, '.js')
        models[schemaName] = Model

        // ALTER SQL TABLE to match schema
        return Model.sync()
      }))

      fastify.decorate('roachmodels', models)
    })
}
