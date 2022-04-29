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
  initMongoFactory()
  initRoachFactory()
})
function initMongoFactory() {
  const {models} = server.db
  this.models = models
  this.Factory = require('../fixtures/mongo-patterns')(models)
}
function initRoachFactory() {
  this.roachmodels = server.roachmodels
  this.RoachFactory = require('../fixtures/roach-patterns')(this.roachmodels)
}
before('attach helpers', function() {
  this.api = api
})

after('close server', async () => server.close())

// This can be used if we're having problems getting the server to
// shut down properly.
//after('kill the process', () => setTimeout(process.exit, 10))

// helper to delete data for mongo
async function deleteMongoData() {
  const models = server.db.models
  const modelNames = Object.keys(models)
  // console.log('deleting data')
  return Promise.all(modelNames.map(name => models[name].deleteMany()))
}

// helper to delete data for roachDB
async function deleteRoachData() {
  const models = server.roachmodels
  const modelNames = Object.keys(models)
  // console.log('deleting data')
  return Promise.all(modelNames.map(name => models[name].destroy({truncate: true})))
}

// Add features here if you wish!
const features = {
  clearDataBetweenTests() {
    before('clear', deleteMongoData)
    afterEach('clear', deleteMongoData)
    before('clear', deleteRoachData)
    afterEach('clear', deleteRoachData)
  },
  clearDataBeforeAndAfter() {
    before('clear', deleteMongoData)
    after('clear', deleteMongoData)
    before('clear', deleteRoachData)
    after('clear', deleteRoachData)
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
