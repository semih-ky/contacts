const { createUser } = require("./user/create");
const { login } = require("./user/login");
const { createContact } = require("./contact/create");
const { updateContact } = require("./contact/update");
const { deleteContact } = require("./contact/delete");
const { listContact } = require("./contact/list");
const { searchContact } = require("./contact/search");

module.exports = {
  createUser,
  login,
  createContact,
  updateContact,
  deleteContact,
  listContact,
  searchContact
}