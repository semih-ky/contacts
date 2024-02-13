const express = require("express");
const router = express.Router();
const validators = require("../validators");
const { jwtVerify } = require("../middleware/jwtVerify")
const { 
  login, 
  createUser, 
  createContact, 
  updateContact, 
  deleteContact,
  listContact,
  searchContact 
} = require("../api");

// Auth
router.post("/api/login", validators.login, login);
router.post("/api/signup", validators.signup, createUser);

// Create contact
router.post("/api/contact", jwtVerify, validators.create, createContact);

// Update contact
router.put("/api/contact", jwtVerify, validators.update, updateContact);

// Delete contact
router.delete("/api/contact", jwtVerify, validators.deleteValidator, deleteContact);

// List contacts
router.get("/api/contact", jwtVerify, listContact);

// Search contact
router.post("/api/contact/search", jwtVerify, validators.search, searchContact);

module.exports = router;
