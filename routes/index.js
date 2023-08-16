const router = require("express").Router();
const userController = require("../controllers/userinfo.controller");
const otpController = require("../controllers/otp.controller");
const authController = require("../controllers/auth.controller");

const { Auth } = require("../middleware/authRoute");


router.post(
  "/token/generated",
  async (req, res, next) => {
    next()
  },
  authController.GenerateJWT
);

router.post(
  "/otp/request",
  async (req, res, next) => {
    Auth(req, res, next)
  },
  otpController.Req_OTP
);

router.post(
  "/customer/register",
  async (req, res, next) => {
    Auth(req, res, next)
  },
  async (req, res, next) => {
    otpController.Verify_OTP(req, res, next)
  },
  userController.CreateUser
);

module.exports = router;
