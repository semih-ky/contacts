const { body } = require("express-validator");

exports.search = [
  body("search")
    .trim()
    .isAlphanumeric("tr-TR",{ignore: " "})
    .withMessage("Search value must be Alphanumeric!"),
];