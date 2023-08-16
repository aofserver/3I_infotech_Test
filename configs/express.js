const express = require('express'),
  cors = require('cors');

module.exports = async (app) => {
  // Connect MongoDB
  require('../configs/databases')

  // CORS
  app.use(cors({origin: '*'}))

  // Parser Body
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // Custom Response Format
  app.use(require('../configs/responseFormat'))
}
