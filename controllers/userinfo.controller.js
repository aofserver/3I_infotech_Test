

const { ResponseFormat } = require('../helpers/responseFormat.helper');

const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const configApp = require('../configs/app')

const userService = require('../services/user.service');

let responseFormat = new ResponseFormat();

const methods = {
    async CreateUser(req, res) {
        try {
            // validate body
            if(!req.body.firstname || !req.body.lastname || !req.body.phonenumber){
                responseData = responseFormat.error40000()
                return res.success(responseData);
            }

            user_data = await userService.find({query:{phonenumber: req.body.phonenumber}})
            if(user_data.length == 0){
                await userService.insert(req.body)
            }
            else{
                responseData = responseFormat.getGeneralResponse(20100, "The requested operation was successfully.");
                return res.success(responseData);
            }
            
            responseData = responseFormat.getGeneralResponse(20000, "The requested operation was successfully.");
            return res.success(responseData);
        } catch (error) {
            // console.log("=====error=====", (error))
            responseData = responseFormat.error50099()
            return res.success(responseData);
        }
    },

   
}

module.exports = {
    ...methods
}