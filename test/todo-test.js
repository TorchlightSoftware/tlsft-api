'use strict'

const chai = require('chai')
const chaiSamSam = require('chai-samsam')
chai.use(chaiSamSam)
const {expect} = chai

// Given the api is started
const api = require('..')
before('start api', async () => api.start())
before('delete data', deleteAllData)

// delete data for all models
async function deleteAllData() {
  const models = api.mongo.db.models
  const modelNames = Object.keys(models)
  console.log('deleting data')
  return Promise.all(
    modelNames.map(name => models[name].deleteMany())
  )
}

// And I have an API client
const apiClient = require('./helpers/api-client')

// When I send a get request to /todos
it('should list empty todos', async () => {
  const response = await apiClient.get('/todos')
  //console.log(response.data)
  expect(response.status).to.equal(200)

  // Then I should receive an array
  expect(response.data).to.eql([])
})

const newTodo = {
  assigned: 'Brandon',
  message: 'get milk'
}
it('should create a todo', async () => {
  const response = await apiClient.post('/todos', newTodo)
  //console.log(response.data)
  expect(response.status).to.equal(201)
})

// When I send a get request to /todos
it('should list newly created todo', async () => {
  const response = await apiClient.get('/todos')
  expect(response.status).to.equal(200)

  // Then I should see the item I just created
  expect(response.data).to.deep.match([newTodo])
})

after('close api', async() => api.close())

// TODO: figure out why this times out
//after('delete data', deleteAllData)
