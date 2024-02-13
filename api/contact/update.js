const { validationResult } = require("express-validator");
const { Contact, Phones } = require("../../models");


exports.updateContact = async (req, res, next) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).json({message: validation.errors[0].msg})
  }

  const { userId } = req.decodeJwt;
  const { id, firstName, lastName, company, mobile } = req.body;

  let contact;
  let phones;
  let updatedContact;
  try {
    contact = await Contact.findByPk(id, {
      include: ["phones"]
    });

    if (userId !== contact.userId) {
      return res.status(400).json({message: "You don't have the permission to update this contact!"});
    }
    
    phones = contact.phones;

    updatedContact = await contact.update({
      firstName,
      lastName,
      company,
      userId,
    })
    
  } catch (error) {
    console.log("Error: ", JSON.stringify(error, null, 2));
    return res.status(500).json({message: "Something went wrong!"});
  }

  try {
    await Promise.all(phones.map(async (item) => {
      await item.destroy();
    }));
  } catch (error) {
    console.log("Error: ", JSON.stringify(error, null, 2));
    return res.status(500).json({message: "Something went wrong!"});
  }

  let newPhones;
  try {

    newPhones = await Promise.all(mobile.map(async (item) => {
      const newPhone = await Phones.create({
        mobile: item,
        contactId: contact.id,
      });
      await newPhone.save();
      return newPhone.dataValues;
    }));

  } catch (error) {
    console.log("Error: ", JSON.stringify(error, null, 2));
    return res.status(500).json({message: "Something went wrong!"});
  }
  
  return res.status(200).json({contact: {
    ...updatedContact.dataValues,
    phones: newPhones,
  }});
}