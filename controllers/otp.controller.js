const { ResponseFormat } = require('../helpers/responseFormat.helper');
var crypto = require('crypto');

const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const configApp = require('../configs/app')

const otpService = require('../services/otp.service')

let responseFormat = new ResponseFormat();

const methods = {
    async Req_OTP(req, res) {
        try {
            var resp = await otpService.SendOTP({ "hash_code": crypto.createHash('sha256').update(req.body.phonenumber).digest('hex') })
            otp_data = await otpService.find({ phonenumber:req.body.phonenumber })
            if(otp_data.length === 0){
                await otpService.insert({ phonenumber:req.body.phonenumber ,ref_code : resp.ref_code})
            }
            else{
                await otpService.findOneAndUpdate({
                    query : { phonenumber: req.body.phonenumber },
                    update : { ref_code: resp.ref_code }
                })
            }
            
            var responseData = responseFormat.getGeneralResponse(20000, "The requested operation was successfully.", resp);
            return res.success(responseData);
        } catch (error) {
            if(error.response){
                res.success(error.response.data);
            }
            else{
                // console.log("=====error=====", (error))
                responseData = responseFormat.error50099()
                res.success(responseData);
            }
        }
    },
    async Verify_OTP(req, res, next) {
        try {
            // validate body
            if(!req.body.phonenumber || !req.body.otp || req.body.otp.length !== 6 || !req.body.ref_code){
                responseData = responseFormat.error40000()
                return res.success(responseData);
            }

            otp_data = await otpService.find({ phonenumber:req.body.phonenumber })
            if(otp_data[0].ref_code !== req.body.ref_code){
                responseData = responseFormat.error40000()
                return res.success(responseData);
            }

            var resp = await otpService.ValidateOTP({
                "hash_code" : crypto.createHash('sha256').update(req.body.phonenumber).digest('hex'),
                "otp" : req.body.otp,
                "ref_code" : req.body.ref_code
            })

            if(!resp.is_valid){
                throw "error"
            }
            next()
        } catch (error) {
            // console.log("=====error=====", (error))
            responseData = responseFormat.error50099()
            res.success(responseData);
        }
    },
}

module.exports = {
    ...methods
}