const { validationResult } = require("express-validator");
const { Contact, Phones } = require("../../models");


exports.createContact = async (req, res, next) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).json({message: validation.errors[0].msg})
  }

  const { userId } = req.decodeJwt;
  const { firstName, lastName, company, mobile } = req.body;

  let newContact;
  try {
    newContact = await Contact.create({
      firstName,
      lastName, 
      company, 
      userId,
      phones: mobile.map((item) => ({mobile: item}))
    }, {
      include: ["phones"]
    });
    await newContact.save()
  } catch (error) {
    console.log("Error: ", JSON.stringify(error, null, 2));
    return res.status(500).json({message: "Something went wrong!"});
  }
    
  return res.status(200).json({contact: newContact});
}