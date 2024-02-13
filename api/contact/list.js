const { User, Contact, Phones } = require("../../models");


exports.listContact = async (req, res, next) => {
  const { userId } = req.decodeJwt;

  let contacts;

  try {
    const user = await User.findByPk(userId, {
      include: [{
        model: Contact,
        as: "contacts",
        include: [{
          model: Phones,
          as: "phones",
          attributes: ["mobile"]
        }]
      }]
    });
    contacts = user.contacts;
  } catch (error) {
    console.log("Error: ", JSON.stringify(error, null, 2));
    return res.status(500).json({message: "Something went wrong!"});
  }

  
  return res.status(200).json(contacts);
}