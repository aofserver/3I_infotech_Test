var axios = require('axios');
const mongoose = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId;
const configs = require("../configs/app")
const model = require('../models/OTP');

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
          "_id": new mongoose.Types.ObjectId(),
          create_timestamp: new Date().getTime(),
          update_timestamp: new Date().getTime()
        }
        const obj = new model(data)
        const inserted = await obj.save()
        resolve(inserted)
      } catch (error) {
        reject(error)
      }
    })
  },
  async SendOTP(data) {
    try {
      var config = {
        method: 'post',
        url: configs.otp_url + '/generate',
        headers: {
          'Content-Type': 'application/json',
          'Application-Id': configs.otp_appid 
        },
        data: JSON.stringify(data)
      };

      if(configs.server.toLocaleLowerCase() != "development"){
        var resp = await axios(config)
      }
      else{
        // mockup node otp
        var string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        var ref = ""
        for (let i = 0; i < 6; i++ ) {
          ref += string[Math.floor(Math.random() * string.length)];
        }
        resp = { data: {"ref_code":ref} }
      }

      return resp.data
    } catch (error) {
      throw error
    }
  },
  async ValidateOTP(data) {
    try {
      var config = {
        method: 'post',
        url: configs.otp_url + '/verify',
        headers: {
          'Content-Type': 'application/json',
          'Application-Id': configs.otp_appid
        },
        data: JSON.stringify(data)
      };
      
      if(configs.server.toLocaleLowerCase() != "development"){
        var result = await axios(config)
      }
      else{
        // mockup node otp
        var result = { data: {is_valid: true} }
      }
      
      return result.data
    } catch (error) {
      return error.response.data
    }
  }

}
module.exports = {
  ...methods
}