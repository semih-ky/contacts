const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

const jsonStringify = (val) => JSON.stringify(val);

const userId = uuidv4();
const password = bcrypt.hashSync("12345678", 10);

const createdAt =  new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
const updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');

const contact = {
  contact_1: uuidv4(),
  contact_2: uuidv4(),
  contact_3: uuidv4(),
  contact_4: uuidv4(),
  contact_5: uuidv4(),
}

const user = [
  {
    id: userId,
    username: "semihkaya",
    password: password,
    createdAt,
    updatedAt
  }
];

const contacts = [
  {
    id: contact.contact_1,
    firstName: "Deniz",
    lastName: "Yilmaz",
    company: "Mobilist",
    userId: userId,
    createdAt,
    updatedAt,
  },
  {
    id: contact.contact_2,
    firstName: "Mustafa",
    lastName: "Zeytin",
    company: "Mobilist",
    userId: userId,
    createdAt,
    updatedAt
  },
  {
    id: contact.contact_3,
    firstName: "Ezel",
    lastName: "Yilmaz",
    company: "Apple",
    userId: userId,
    createdAt,
    updatedAt
  },
  {
    id: contact.contact_4,
    firstName: "Yilmaz",
    lastName: "Deniz",
    company: "Samsung",
    userId: userId,
    createdAt,
    updatedAt
  },
  {
    id: contact.contact_5,
    firstName: "Brad",
    lastName: "Pitt",
    company: "Holywood",
    userId: userId,
    createdAt,
    updatedAt
  },
];

const phones = [
  {
    id: uuidv4(),
    mobile: "05321122121",
    contactId: contact.contact_1,
    createdAt,
    updatedAt
  },
  {
    id: uuidv4(),
    mobile: "05321122109",
    contactId: contact.contact_2,
    createdAt,
    updatedAt
  },
  {
    id: uuidv4(),
    mobile: "05555677676",
    contactId: contact.contact_3,
    createdAt,
    updatedAt
  },
  {
    id: uuidv4(),
    mobile: "05310099898",
    contactId: contact.contact_4,
    createdAt,
    updatedAt
  },
  {
    id: uuidv4(),
    mobile: "05341343458",
    contactId: contact.contact_5,
    createdAt,
    updatedAt
  },
  {
    id: uuidv4(),
    mobile: "05329959595",
    contactId: contact.contact_5,
    createdAt,
    updatedAt
  },
  {
    id: uuidv4(),
    mobile: "05350010002",
    contactId: contact.contact_5,
    createdAt,
    updatedAt
  }
];

module.exports = {
  user,
  contacts,
  phones
}