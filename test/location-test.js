'use strict'
/* eslint-disable no-unused-expressions */

const {expect} = require('chai')
const boiler = require('./helpers/boiler')

// some test data
const newLocation = {
  geo: {type: 'Point', coordinates: [39.807222, -76.984722]},
  entityid: 6,
}
const updateGeo = {type: 'Point', coordinates: [39.807333, -76.984711]}

const pointProps = {
  crs: {
    properties: {
      name: 'EPSG:4326'
    },
    type: 'name'
  },
  type: 'Point'
}

boiler('locations', ['clearDataBeforeAndAfter'], function() {
  // When I send a get request to /locations
  it('should list empty locations', async function() {
    const response = await this.api.get('/locations')
    //console.log(response.data)
    expect(response.status).to.equal(200)
    // Then I should receive an array
    expect(response.data).to.eql([])
  })

  let newLocationId
  it('should create a location', async function() {
    const response = await this.api.post('/locations', newLocation)
    expect(response.status).to.equal(201)
    expect(response.data.id, 'id').to.exist
    newLocationId = response.data.id
  })

  // When I send a get request to /locations
  it('should list newly created location', async function() {
    const response = await this.api.get('/locations')
    expect(response.status).to.equal(200)

    // Then I should see the item I just created
    expect(response.data).to.deep.match([newLocation])
  })

  // When I request the specific Location
  it('should get newly created location', async function() {
    const response = await this.api.get(`/locations/${newLocationId}`)
    expect(response.status).to.equal(200)

    // Then I should see the item I just created
    expect(response.data).to.deep.match(newLocation)
  })

  // When I update a Location
  it('should get newly created location', async function() {
    let response = await this.api.patch(`/locations/${newLocationId}`, {geo: updateGeo})
    expect(response.status).to.equal(200)

    // Then I should see the item I just updated
    response = await this.api.get(`/locations/${newLocationId}`)
    expect(response.status).to.equal(200)
    expect(response.data.geo).to.deep.equal({
      ...updateGeo,
      ...pointProps,
    })
  })
})
