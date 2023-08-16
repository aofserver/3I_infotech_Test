const { ResponseFormat } = require('../helpers/responseFormat.helper');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const configApp = require('../configs/app')


let responseFormat = new ResponseFormat();



function DecodeJWT(token){
    return jwt.verify(token, 'privateKey');
}


const methods = {
    async GenerateJWT(req, res) {
        try {
            var now = new Date()
            var token = jwt.sign({ 
                id: ObjectId(),
                timestamp: now.getTime(), 
                expired: new Date(now.getTime() + 5*60*1000).getTime(), //expire 5 min
            }, "privateKey");
            var responseData = responseFormat.getGeneralResponse(20000, "The requested operation was successfully.", token);
            return res.success(responseData);
        } catch (error) {
            // console.log("======error======",error)
            responseData = responseFormat.error50099()
            res.success(responseData);
        }
    },
}

module.exports = {
    ...methods
}