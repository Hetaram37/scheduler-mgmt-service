'use strict'

const schedulerRoute = require('./scheduler.route')

module.exports = (app) => {
  app.use('/api/scheduler', schedulerRoute)
}
