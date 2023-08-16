const ResponseTemplate = require("./configResponse");
const { templageLog } = require("./logTemplate");
const { logger } = require("./logger");
module.exports = (isProduction = false, app) => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    let err = new Error("Endpoint Not Found");
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    if (err.type == "entity.parse.failed") {
      const response = new ResponseTemplate("40010", "The body must be a JSON");
      res.status(400);
      res.json({ Code: response.Code });
      currentTime = new Date().getTime();
    } else {
      let statusCode = err.status || 500;
      let response = { status: statusCode || "", message: "" }
      res.response = response
      templageLog(req, res, "error")
      res.status(statusCode);
      res.json(
        new ResponseTemplate(JSON.stringify(statusCode) + "00", err.message)
      );
    }
  });
};
