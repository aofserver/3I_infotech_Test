const mongoose = require("mongoose");
const config = require("../configs/app");

const databases = {
  mongoDB() {
    if(!!config.mongodbPass && !!config.mongodbUser){
      var connectionString = `mongodb://${config.mongodbUser}:${encodeURIComponent(config.mongodbPass)}@${config.mongodbHost}:${config.mongodbPort}/${config.mongodbNameDB}?connectTimeoutMS=20000&socketTimeoutMS=20000&directConnection=true&authSource=admin&retryWrites=true`
    } 
    else{
      var connectionString = `mongodb://${config.mongodbHost}:${config.mongodbPort}/${config.mongodbNameDB}?connectTimeoutMS=20000&socketTimeoutMS=20000&directConnection=true&authSource=admin&retryWrites=true`
    }

    const db = mongoose.connect(
      connectionString,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        auto_reconnect: true,
        connectTimeoutMS: 7500,
      },
      (error) => {
        if (error) {
          console.error("[ error ] MongoDB error: ",  error);
        } else {
          console.log("[ info ] MongoDB connected.");
        }
      }
    );
    return db;
  }
};

module.exports = databases.mongoDB();
