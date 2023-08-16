const logger = require("./logger");
const { templageLog } = require("./logTemplate")

module.exports = (req, res, next) => {
  
  res.success = (data = "", statusCode = 200) => {
    // delete data.DeveloperMessage;
    let response = { status: statusCode || "", message: data || "" }
    res.response = response
    templageLog(req, res)
    res.status(statusCode || 200).send(data);
  };

  res.error = ({ message, status = 500, code, data = undefined }) => {
    let response;
    if (data == undefined) {
      response = { status: status, message: message };
      if (code) errorBody.code = code;
    } else {
      response = {
        Code: code,
        ...data,
      };
    }
    res.response = response
    templageLog(req, res)
    res.status(status || 500).send(response);
  };
  
  next();
};
