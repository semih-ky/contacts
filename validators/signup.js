const { body } = require("express-validator");

exports.signup = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must at least 3 character long!")
    .isAlphanumeric()
    .withMessage("Username must be Alphanumeric!")
    .not()
    .matches(/\s+/gm)
    .withMessage("Username must not contain whitespace!"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must at least 8 character long!")
    .not()
    .matches(/\s+/gm)
    .withMessage("Password must not contain whitespace!"),
  body("rePassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Re Password does not match!");
    }
    return true;
  }),
];