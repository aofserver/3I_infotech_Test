require("dotenv").config();

const env = {
  server: process.env.SERVER || "development",
  port: process.env.PORT || 3000,
  appName: process.env.APPNAME || "Minor",
  mongodbHost: process.env.MONGODB_HOST || "127.0.0.1",
  mongodbPort: process.env.MONGODB_PORT || "27017",
  mongodbNameDB: process.env.MONGODB_NAMEDB || "mydb",
  mongodbUser: process.env.MONGODB_USER || "",
  mongodbPass: process.env.MONGODB_PASS || "",
  otp_url: process.env.OTP_URL || "https://ihn5qr2twzw6cdxrhj6wjcehea0cpzys.lambda-url.ap-southeast-1.on.aws",
  otp_appid: process.env.OTP_APPID || 'ecd8c7eb-7c02-4108-9acf-5b88c939cc86'
};


Object.keys(env).map((i)=>{ env[i] ? "" : console.log(`[ error ] missing environment parameter ${i}.`) })
module.exports = env;