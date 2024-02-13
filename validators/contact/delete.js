const { body } = require("express-validator");

exports.deleteValidator = [
  body("id")
    .trim()
    .isUUID()
    .withMessage("ID must be UUID!"),
];