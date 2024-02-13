const { Op } = require("sequelize")
const { validationResult } = require("express-validator");
const { User, Contact, Phones } = require("../../models");

exports.searchContact = async (req, res, next) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).json({message: validation.errors[0].msg})
  }

  const { userId } = req.decodeJwt;

  let { search: searchValue } = req.body;

  const isMobile = Number(searchValue);
  searchValue = searchValue.split(" ");

  let contactWhere = {};
  let phonesWhere = {};

  if (isNaN(isMobile)) {
    contactWhere = {
      where: {
        [Op.or]: {
          firstName: {
            [Op.regexp]: searchValue[0] + "+"
          },
          lastName: {
            [Op.regexp]: (searchValue[1] || searchValue[0]) + "+"
          },
          company: {
            [Op.regexp]: searchValue[0] + "+"
          },
        }
      }
    }
  } else {
    phonesWhere = {
      where: {
        mobile: {
          [Op.regexp]: searchValue[0] + "+"
        }
      }
    }
  }

  let contacts;
  try {
    const user = await User.findByPk(userId, {
      include: [{
        model: Contact,
        as: "contacts",
        ...contactWhere,
        include: [{
          model: Phones,
          as: "phones",
          attributes: ["mobile"],
          ...phonesWhere,
        }]
      }],
    });
    contacts = user?.contacts;
  } catch (error) {
    console.log("Error: ", JSON.stringify(error, null, 2));
    return res.status(500).json({message: "Something went wrong!"});
  }

  return res.status(200).json({contacts});
}