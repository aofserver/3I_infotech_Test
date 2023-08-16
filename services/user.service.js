var axios = require('axios');
const mongoose = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId;
const configs = require("../configs/app")
const model = require('../models/USER');


const methods = {
  findOneAndUpdate(queryObj) {
    return new Promise(async (resolve, reject) => {
      try {
        queryObj.update = {...queryObj.update, update_timestamp: new Date().getTime()}
        Promise.all([ model.findOneAndUpdate(queryObj.query, queryObj.update, queryObj.option) ])
          .then((result) => {
            const rows = result[0]
            resolve(rows)
          })
          .catch((error) => {
            reject(error)
          })
      } catch (error) {
        reject(error)
      }
    })
  },
  find(query) {
    return new Promise(async (resolve, reject) => {
      try {
        queryObj = {
          query: query.query,
          filter: query.filter || {}
        }
        sort = query.sort || {}
        limit = !Object.keys(query).includes("limit") ? 100 : query.limit
        Promise.all([
          model.find(queryObj.query, queryObj.filter).sort(sort).limit(limit),
        ])
          .then((result) => {
            const rows = result[0]
            resolve(rows)
          })
          .catch((error) => {
            reject(error)
          })
      } catch (error) {
        reject(error)
      }
    })
  },
  insert(data) {
    return new Promise(async (resolve, reject) => {
      try {
        data = {
          ...data,
          "_id": new mongoose.Types.ObjectId()
          , create_timestamp: new Date().getTime(),
          update_timestamp: new Date().getTime()
        }
        const obj = new model(data)
        const inserted = await obj.save()
        resolve(inserted)
      } catch (error) {
        reject(error)
      }
    })
  }
}

module.exports = {
  ...methods
}