const { login } = require("./login");
const { signup } = require("./signup");
const { create } = require("./contact/create");
const { update } = require("./contact/update");
const { search } = require("./contact/search");
const { deleteValidator } = require("./contact/delete");

module.exports = {
  login,
  signup,
  create,
  update,
  search,
  deleteValidator
}