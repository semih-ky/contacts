const { validationResult } = require("express-validator");
const { User } = require("../../models");

exports.createUser = async (req, res, next) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).json({message: validation.errors[0].msg})
  }

  const { username, password } = req.body;

  let user;
  try {
    user = await User.findOne({ where: { username } });
  } catch (error) {
    console.log("Error: ", JSON.stringify(error, null, 2));
    return res.status(500).json({message: "Something went wrong!"});
  }

  if (user) {
    return res.status(400).json({message: "User has already exist!"});
  }

  try {
    const newUser = await User.create({
      username,
      password
    });
    await newUser.save()
  } catch (error) {
    console.log("Error: ", JSON.stringify(error, null, 2));
    return res.status(500).json({message: "Something went wrong!"});
  }

  return res.status(200).json({message: "Successful!"});
}