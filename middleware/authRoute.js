const { ResponseFormat } = require('../helpers/responseFormat.helper');
let responseFormat = new ResponseFormat();
var jwt = require('jsonwebtoken');

function DecodeJWT(token){
    return jwt.verify(token, 'privateKey');
}

const method = {
    async Auth(req, res, next) {
        try {
            if (req.headers['authorization'] && req.headers['authorization'].split(" ")[0] == "Bearer") {
                data = DecodeJWT(req.headers['authorization'].split(" ")[1])
                if(new Date(data.expired) < new Date()){
                    throw "token expired"
                }
                next()
            }
            else {
                throw "error authorization"
            }
        } catch (error) {
            // console.log("====error====",error)
            var responseData = responseFormat.error40103();
            return res.success(responseData, 401);
        }
    },
}
module.exports = { ...method }