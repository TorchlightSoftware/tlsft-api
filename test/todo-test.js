'use strict'

const {expect} = require('chai')

// Given the api is started
const api = require('..')
before('start api', async () => api.start())

// And I have an API client
const axios = require('axios').create({
  baseURL: `http://localhost:${process.env.PORT}`
})

// When I send a get request to /todos
it('should list todos', async () => {
  const response = await axios.get('/todos')
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
  const response = await axios.post('/todos', newTodo)
  //console.log(response.data)
  expect(response.status).to.equal(201)
})

// When I send a get request to /todos
it('should list todos', async () => {
  const response = await axios.get('/todos')
  //console.log(response.data)
  expect(response.status).to.equal(200)

  // Then I should see the item I just created
  expect(response.data).to.eql([newTodo])
})

after('close api', async() => api.close())
