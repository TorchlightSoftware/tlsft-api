'use strict'

require('dotenv').config()

// yo dawg, I heard you like columns of fire
require('make-promises-safe')

// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true,
})

// add a relative path helper called 'root'
const {join} = require('path')
fastify.decorate('root', (...path) => join(__dirname, ...path))

// helper to load all files in a directory/subdirectories
const klawSync = require('klaw-sync')
const forEachFileUnder = (path, fn) => {
  klawSync(fastify.root(path), {
    nodir: true,
    filter: ({path}) => path.endsWith('.js'),
    traverseAll: true
  }).map(({path}) => path).map(fn)
}

// load plugins
forEachFileUnder('plugins', file => fastify.register(require(file)))

// load routes
forEachFileUnder('routes', file => fastify.register(require(file)))

// helper to instantiate singleton instance of app
fastify.decorate('status', 'not started')

fastify.decorate('start', async () => {
  if (fastify.status === 'started') {
    return fastify
  } else if (fastify.status === 'starting') {
    await fastify.ready()
    return fastify
  }

  fastify.status = 'starting'
  return new Promise((resolve, reject) =>
    fastify.listen(3000, function(err, address) {
      if (err) return reject(err)
      fastify.log.info(`server listening on ${address}`)
      fastify.status = 'started'
      resolve(fastify)
    })
  )
})

// start the server if `$ node server.js`
if (require.main === module) {
  fastify.start().catch(err => {
    fastify.log.error(err)
    process.exit(1)
  })
}
