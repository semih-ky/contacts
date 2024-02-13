const { validationResult } = require("express-validator");
const { Contact } = require("../../models");


exports.deleteContact = async (req, res, next) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).json({message: validation.errors[0].msg})
  }

  const { userId } = req.decodeJwt;
  const { id } = req.body;

  try {
    const contact = await Contact.findByPk(id);

    if (userId !== contact.userId) {
      return res.status(400).json({message: "You don't have the permission to delete this contact!"});
    }

  } catch (error) {
    console.log("Error: ", JSON.stringify(error, null, 2));
    return res.status(500).json({message: "Something went wrong!"});
  }

  let deletedContact;
  try {
    deletedContact = await Contact.destroy({
      where: { id: id }
    });
  } catch (error) {
    console.log("Error: ", JSON.stringify(error, null, 2));
    return res.status(500).json({message: "Something went wrong!"});
  }
  
  return res.status(200).json({message: "Success!"});
}