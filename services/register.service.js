
var axios = require('axios');
const mongoose = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId;
const configs = require("../configs/app")
const modelUser = require('../models/USER');
const modelCompany = require('../models/COMPANY');


const methods = {
  // findOneAndUpdate(queryObj) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       queryObj.update = {...queryObj.update, update_timestamp: new Date().getTime()}
  //       Promise.all([
  //         model.findOneAndUpdate(queryObj.query, queryObj.update, queryObj.option), //mongoose model
  //       ])
  //         .then((result) => {
  //           const rows = result[0]
  //           resolve(rows)
  //         })
  //         .catch((error) => {
  //           reject(error)
  //         })
  //     } catch (error) {
  //       reject(error)
  //     }
  //   })
  // },
  // find(queryObj) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       queryObj = {
  //         query: queryObj.query,
  //         filter: queryObj.filter || {}
  //       }
  //       Promise.all([
  //         model.find(queryObj.query, queryObj.filter),
  //       ])
  //         .then((result) => {
  //           const rows = result[0]
  //           resolve(rows)
  //         })
  //         .catch((error) => {
  //           reject(error)
  //         })
  //     } catch (error) {
  //       reject(error)
  //     }
  //   })
  // },
  // insert(data) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       data = {
  //         ...data,
  //         "_id": new mongoose.Types.ObjectId()
  //         , create_timestamp: new Date().getTime(),
  //         update_timestamp: new Date().getTime()
  //       }
  //       const obj = new model(data)
  //       const inserted = await obj.save()
  //       resolve(inserted)
  //     } catch (error) {
  //       reject(error)
  //     }
  //   })
  // },


  findCompany(queryObj) {
    return new Promise(async (resolve, reject) => {
      try {
        queryObj = {
          query: queryObj.query,
          filter: queryObj.filter || {}
        }
        Promise.all([
          modelCompany.find(queryObj.query, queryObj.filter),
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
  findUser(queryObj) {
    return new Promise(async (resolve, reject) => {
      try {
        queryObj = {
          query: queryObj.query,
          filter: queryObj.filter || {}
        }
        Promise.all([
          modelUser.find(queryObj.query, queryObj.filter),
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
  insertUser(data) {
    return new Promise(async (resolve, reject) => {
      try {
        data = {
          ...data,
          "_id": new mongoose.Types.ObjectId()
          , create_timestamp: new Date().getTime(),
          update_timestamp: new Date().getTime()
        }
        const obj = new modelUser(data)
        const inserted = await obj.save()
        resolve(inserted)
      } catch (error) {
        reject(error)
      }
    })
  },
}
module.exports = {
  ...methods
}