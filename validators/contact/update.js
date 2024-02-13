const { body } = require("express-validator");
const validator = require('validator');

exports.update = [
  body("id")
    .trim()
    .isUUID()
    .withMessage("ID must be UUID!"),
  body("firstName")
    .trim()
    .isAlpha("tr-TR",{ignore: " "})
    .withMessage("First name must be [A-Za-z]!"),
  body("lastName")
    .trim()
    .isAlpha("tr-TR",{ignore: " "})
    .withMessage("Last name must be [A-Za-z]!"),
  body("company")
    .trim()
    .isAlphanumeric("tr-TR",{ignore: " "})
    .withMessage("Company must be Alphanumeric!"),
  body("mobile").custom((value, { req }) => {
    if (Array.isArray(value)) {
      value.forEach((phone) => {
        if (!validator.isMobilePhone(phone, "tr-TR")) {
          throw new Error("Mobile contains invalid mobile phone!");
        }
      });
      return true;
    } else {
      throw new Error("Mobile must be array!");
    }
  }),
];