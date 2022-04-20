const {factory} = require('@dreamlines/factory-girl')

module.exports = models => {
  const {Todo} = models

  factory.define('todo', Todo, {
    assigned: 'Bob',
    message: 'take out trash',
  })

  return factory
}
