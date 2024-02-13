const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator");
const { User } = require("../../models");

exports.login = async (req, res, next) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).json({message: validation.errors[0].msg})
  }

  const { username, password } = req.body;

  let user;
  let isValidPass;
  try {
    user = await User.findOne({ where: { username } });
    if (user) {
      isValidPass = await user.comparePassword(password);
    }
  } catch (error) {
    console.log("Error: ", JSON.stringify(error, null, 2));
    return res.status(500).json({message: "Something went wrong!"});
  }

  if (!user) {
    return res.status(400).json({message: "Invalid username!"});
  }

  if (!isValidPass) {
    return res.status(400).json({message: "The password does not match!"});
  }

  let token;
  try {
    token = await jwtSign({ userId: user.id}, "some-privateKey-pem", { expiresIn: "1h" });
  } catch (error) {
    console.log("Error: ", JSON.stringify(error, null, 2));
    return res.status(500).json({message: "Something went wrong!"});
  }

  return res.status(200).json({token});
}

const jwtSign = (payload={}, privateKey, options={}) => {
  const { userId } = payload;
  return new Promise((resolve, reject) => {
    jwt.sign({ userId }, privateKey, options,
    function (error, token) {
      if (error) reject(error);
      resolve(token);
    });
  })
}