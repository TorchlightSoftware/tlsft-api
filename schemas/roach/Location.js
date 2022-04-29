const Sequelize = require('sequelize-cockroachdb')

module.exports = {
  table: 'locations',
  columns: {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    geo: {
      type: Sequelize.GEOMETRY,
    },
    entityid: {
      type: Sequelize.INTEGER,
    }
  }
}
