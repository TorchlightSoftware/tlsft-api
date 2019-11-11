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
it('should get /todos', async () => {
  const response = await axios.get('/todos')
  //console.log(response.data)
  expect(response.status).to.equal(200)

  // Then I should receive an array
  expect(response.data).to.eql([])
})

after('close api', async() => api.close())