'use strict'
/* eslint-disable no-unused-expressions */

const {expect} = require('chai')
const boiler = require('./helpers/boiler')

// some test data
const newTodo = {
  assigned: 'Brandon',
  message: 'get milk'
}

boiler('todos', ['clearDataBeforeAndAfter'], function() {

  // When I send a get request to /todos
  it('should list empty todos', async function() {
    const response = await this.api.get('/todos')
    //console.log(response.data)
    expect(response.status).to.equal(200)

    // Then I should receive an array
    expect(response.data).to.eql([])
  })

  let newTodoId
  it('should create a todo', async function() {
    const response = await this.api.post('/todos', newTodo)
    //console.log(response.data)
    expect(response.status).to.equal(201)
    expect(response.data.id, 'id').to.exist
    newTodoId = response.data.id
  })

  // When I send a get request to /todos
  it('should list newly created todo', async function() {
    const response = await this.api.get('/todos')
    expect(response.status).to.equal(200)

    // Then I should see the item I just created
    expect(response.data).to.deep.match([newTodo])
  })

  // When I request the specific Todo
  it('should get newly created todo', async function() {
    const response = await this.api.get(`/todos/${newTodoId}`)
    expect(response.status).to.equal(200)

    // Then I should see the item I just created
    expect(response.data).to.deep.match(newTodo)
  })

  // When I update a Todo
  it('should get newly created todo', async function() {
    let response = await this.api.patch(`/todos/${newTodoId}`,
      {assigned: 'Tommy'}
    )
    expect(response.status).to.equal(200)

    // Then I should see the item I just updated
    response = await this.api.get(`/todos/${newTodoId}`)
    expect(response.status).to.equal(200)
    expect(response.data.assigned).to.equal('Tommy')
  })
})
