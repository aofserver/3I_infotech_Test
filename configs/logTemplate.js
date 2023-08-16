const moment = require("moment-timezone");
const os = require("os");
const config = require("./app");
const { logger } = require("../configs/logger");

const templageLog = (
  req,
  res,
  level = "Info",
) => {
  try {
    if(!req.headers["startTime"]){
      req.headers["startTime"] = new Date().getTime()
    }

    return logger.info(
      JSON.stringify(
        {
          level: level,
          cmdName: res.locals.cmdname || "",
          method: req.method || "",
          host: req.hostname || "",
          url: req.originalUrl || "",
          request : {
            req_body: req.body || "",
            req_headers: req.headers || "",
            req_query: req.query || "",
          },
          response : {
            status: res.response.status || "",
            res_body: res.response.message || ""
          },
          activityLog: {
            startTime: replaceZ(new Date(moment(req.headers["startTime"]).add(7, "hour")).toISOString() + "+07:00"),
            endTime: replaceZ(new Date(moment().add(7, "hour")).toISOString() + "+07:00"),
            processTime: (new Date().getTime() - req.headers["startTime"]) / 1000,
          } || "",
        }
      )
    );
  } catch (e) {
    console.log("======================Error=================================");
    console.log(e);
  }
};

function replaceZ(CustomeDate) {
  const data = CustomeDate.replace("Z", "");
  return data;
}



module.exports = {
  templageLog: templageLog
};
