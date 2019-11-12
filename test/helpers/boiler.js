// boiler is responsible for:
// * setting up test runtime
// * setting up an API client
// * between each test, wipe the database
// * other features we may have added?

// override with test env settings
process.env.NODE_ENV = 'test'
process.env.PORT = 3174
Error.stackTraceLimit = 5

const chai = require('chai')
const chaiSamSam = require('chai-samsam')
chai.use(chaiSamSam)

const torch = require('torch')

const server = require('../..')
const api = require('./api-client')

torch.toggleElapsed()
torch.setDepth(5)

// hooks that run surrounding *all* tests
before('start server', async () => server.start())
before('initialize factory', function() {
  const {models} = server.mongo.db
  this.models = models
  this.Factory = require('../fixtures/factory-patterns')(models)
})
before('attach helpers', function() {
  this.api = api
})

after('close server', async () => server.close())

// This can be used if we're having problems getting the server to
// shut down properly.
//after('kill the process', () => setTimeout(process.exit, 10))

// helper to delete data for all models
async function deleteAllData() {
  const models = server.mongo.db.models
  const modelNames = Object.keys(models)
  console.log('deleting data')
  return Promise.all(
    modelNames.map(name => models[name].deleteMany())
  )
}

// Add features here if you wish!
const features = {
  clearDataBetweenTests() {
    before('clear', deleteAllData)
    afterEach('clear', deleteAllData)
  },
  clearDataBeforeAndAfter() {
    before('clear', deleteAllData)
    after('clear', deleteAllData)
  },
  login() {
    // how should we log in to your app?
  },
}

// our export function!
// gives us standard app startup and lets us enable other features
// as desired
const boiler = function(name, enableFeatures, tests) {
  if (arguments.length === 2) return boiler(name, [], enableFeatures)

  describe(name, function() {
    enableFeatures.forEach(f => features[f]())
    tests()
  })
}

module.exports = boiler
