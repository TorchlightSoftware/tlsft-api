const {factory} = require('@dreamlines/factory-girl')

module.exports = models => {
  const {Location} = models

  factory.define('location', Location, {
    geo: {type: 'Point', coordinates: [39.807222, -76.984722]},
    entityid: 6,
  })

  return factory
}
